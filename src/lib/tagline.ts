// WAC-TODO: keep in sync with the HomePage global `tagline` defaultValue
// until the final WAC tagline copy is supplied.
export const DEFAULT_TAGLINE = 'Wellington Adventure Centre\n[tagline copy placeholder]'

// Null/undefined (never set) falls back to the default; an explicitly
// cleared tagline renders as a single empty line (text hidden).
export function taglineLines(tagline?: string | null): string[] {
  return (tagline ?? DEFAULT_TAGLINE).split('\n')
}
