#!/usr/bin/env bash
#
# Sync production D1 + R2 media down to local dev state.
#
# Usage:
#   pnpm run sync:local [--skip-db] [--skip-media] [--env production]
#
# What it does:
#   1. D1:  exports the remote database to SQL, wipes local D1 state
#       (.wrangler/state/v3/d1), re-imports the dump locally.
#   2. R2:  reads media filenames from the remote D1 `media` table,
#       downloads each object from remote R2, uploads it to local R2.
#
# Static files in public/ (hero images, videos) are already in git
# and are NOT synced by this script.
#
# Prerequisites: authenticated wrangler (`pnpm wrangler login`),
# PAYLOAD_SECRET present in .env (required to boot local dev),
# sqlite3 CLI (macOS: preinstalled, WSL/Ubuntu: sudo apt install sqlite3).
#
# Portable across macOS and Linux/WSL: bash 3.2 compatible
# (no mapfile, associative arrays, or other bash 4+ features).

set -euo pipefail

cd "$(dirname "$0")/.."

D1_DB="wellington_adventure_centre"
R2_BUCKET="welllingtonadventurecentre"
SRC_ENV="production"
SYNC_DB=true
SYNC_MEDIA=true

for arg in "$@"; do
  case "$arg" in
    --skip-db) SYNC_DB=false ;;
    --skip-media) SYNC_MEDIA=false ;;
    --env=*) SRC_ENV="${arg#--env=}" ;;
    --env) echo "Use --env=<name> (e.g. --env=production)"; exit 1 ;;
    -h | --help)
      sed -n '2,/Prerequisites/p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown arg: $arg (see --help)"
      exit 1
      ;;
  esac
done

# NOTE: named SYNC_TMP (not TMPDIR) — macOS already exports $TMPDIR
# and mktemp/wrangler rely on it.
SYNC_TMP="$(mktemp -d)"
trap 'rm -rf "$SYNC_TMP"' EXIT

if [ "$SYNC_DB" = true ]; then
  if ! command -v sqlite3 >/dev/null; then
    case "$(uname -s)" in
      Linux*) echo "✘ sqlite3 CLI is required: sudo apt install sqlite3 (WSL/Ubuntu)." ;;
      Darwin*) echo "✘ sqlite3 CLI is required (normally ships with macOS — check your PATH)." ;;
      *) echo "✘ sqlite3 CLI is required." ;;
    esac
    echo "  Nothing was changed."
    exit 1
  fi
  echo "→ Exporting remote D1 ($D1_DB, env $SRC_ENV)…"
  # The D1 export endpoint occasionally returns a transient auth error,
  # so retry a few times before giving up.
  EXPORT_OK=false
  for attempt in 1 2 3; do
    if pnpm exec wrangler d1 export "$D1_DB" --env "$SRC_ENV" --remote --output "$SYNC_TMP/wac-dump.sql"; then
      EXPORT_OK=true
      break
    fi
    echo "  Export attempt $attempt failed, retrying in 10s…"
    sleep 10
  done
  if [ "$EXPORT_OK" != true ] || [ ! -s "$SYNC_TMP/wac-dump.sql" ]; then
    echo "✘ D1 export failed after 3 attempts. Nothing was changed locally."
    exit 1
  fi

  echo "→ Resetting local D1 state (stop pnpm dev first!)…"
  rm -rf .wrangler/state/v3/d1
  # Recreate the state dir so we learn the exact sqlite filename miniflare uses.
  pnpm exec wrangler d1 execute "$D1_DB" --env local --local --command 'SELECT 1;' >/dev/null
  DB_FILE="$(find .wrangler/state/v3/d1 -name '*.sqlite' | head -1)"
  if [ -z "$DB_FILE" ]; then
    echo "✘ Could not locate local D1 file. Nothing was imported."
    exit 1
  fi

  echo "→ Importing dump into local D1…"
  # NOTE: imported with the sqlite3 CLI, not `wrangler d1 execute --file`.
  # D1 enforces foreign keys, so the dump's child-first INSERTs (e.g.
  # users_sessions before users) fail there, while sqlite3 runs with FK
  # enforcement off — which is what the dump's own PRAGMA preamble assumes.
  sqlite3 "$DB_FILE" <"$SYNC_TMP/wac-dump.sql"

  # Production still carries upload columns (hero_image_id, sidekick_image_id)
  # from the unmerged copilot/add-cms-managed-images-adventurepromo branch,
  # which main's text-path fields don't define. `pnpm dev` auto-pushes the
  # code schema and would prompt (then fail) on that diff — drop the orphan
  # columns so dev boots prompt-free. Local copy only; re-sync restores them.
  for col in hero_image_id sidekick_image_id; do
    if [ -n "$(sqlite3 "$DB_FILE" "SELECT name FROM pragma_table_info('adventure_promo') WHERE name = '$col';")" ]; then
      echo "→ Dropping orphan column adventure_promo.$col (local only)…"
      sqlite3 "$DB_FILE" "ALTER TABLE adventure_promo DROP COLUMN $col;"
    fi
  done
  sqlite3 "$DB_FILE" 'PRAGMA optimize;'
  echo "✓ D1 synced"
fi

if [ "$SYNC_MEDIA" = true ]; then
  echo "→ Listing media files from remote D1…"
  pnpm exec wrangler d1 execute "$D1_DB" --env "$SRC_ENV" --remote \
    --command 'SELECT filename FROM media WHERE filename IS NOT NULL;' \
    --json >"$SYNC_TMP/media.json"

  node -e "
const fs = require('fs');
const out = JSON.parse(fs.readFileSync('$SYNC_TMP/media.json', 'utf8'));
const files = [];
for (const r of out) {
  for (const row of (r.results || [])) {
    if (row.filename) files.push(row.filename);
  }
}
fs.writeFileSync('$SYNC_TMP/media-files.txt', files.length ? files.join('\n') + '\n' : '');
"

  COUNT="$(grep -c . "$SYNC_TMP/media-files.txt" || true)"
  echo "→ Syncing $COUNT R2 objects ($R2_BUCKET)…"
  echo "→ Resetting local R2 state (clean mirror)…"
  rm -rf .wrangler/state/v3/r2
  mkdir -p "$SYNC_TMP/r2"
  while IFS= read -r key; do
    [ -n "$key" ] || continue
    safe="$(echo "$key" | tr '/' '_')"
    pnpm exec wrangler r2 object get "$R2_BUCKET/$key" --remote --file "$SYNC_TMP/r2/$safe" >/dev/null
    pnpm exec wrangler r2 object put "$R2_BUCKET/$key" --env local --local --file "$SYNC_TMP/r2/$safe" >/dev/null
    # wrangler percent-encodes keys on put (spaces → %20) while DB
    # filenames and remote keys are raw — normalize the local key back
    # so Payload lookups hit. Miniflare-internal; skipped silently if
    # the index layout ever changes.
    ENC_KEY="$(node -e "console.log(encodeURI(process.argv[1]))" "$key")"
    if [ "$ENC_KEY" != "$key" ]; then
      R2_INDEX="$(find .wrangler/state/v3/r2 -name '*.sqlite' ! -name '*-wal' ! -name '*-shm' | head -1)"
      if [ -n "$R2_INDEX" ] && [ -n "$(sqlite3 "$R2_INDEX" "SELECT name FROM sqlite_master WHERE name='_mf_objects';")" ]; then
        ESC_KEY="${key//\'/\'\'}"
        ESC_ENC="${ENC_KEY//\'/\'\'}"
        sqlite3 "$R2_INDEX" "UPDATE _mf_objects SET key='$ESC_KEY' WHERE key='$ESC_ENC';"
      fi
    fi
    echo "  ✓ $key"
  done <"$SYNC_TMP/media-files.txt"
  echo "✓ R2 media synced ($COUNT files)"
fi

echo "Done. Start local dev with: pnpm dev"
