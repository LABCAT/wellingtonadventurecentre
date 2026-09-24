import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { resendAdapter } from '@payloadcms/email-resend'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { PageIntro } from './collections/PageIntro'
import { TourPages } from './collections/TourPages'
import { TourProducts } from './collections/TourProducts'
import { PromoPages } from './collections/PromoPages'
import { EventPages } from './collections/EventPages'
import { ContentPanels } from './collections/ContentPanels'
import { BookingEnquiry } from './collections/BookingEnquiry'
import { AdventurePromo } from './collections/AdventurePromo'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { RiskDisclosurePage } from './globals/RiskDisclosurePage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => {
  try {
    return fs.existsSync(value) ? fs.realpathSync(value) : undefined
  } catch {
    return undefined
  }
}

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  if (!resolved) return false
  return (
    resolved.endsWith(path.join('payload', 'bin.js')) ||
    resolved.endsWith(path.join('next', 'dist', 'bin', 'next'))
  )
})
const isProduction = process.env.NODE_ENV === 'production'
// Next 16 collects page data in jest-worker child processes, so `isCLI` no
// longer detects `next build`. Force local bindings during the build phase
// instead of connecting to the deployed Worker's remote bindings.
const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || isBuild || !isProduction
    ? await getCloudflareContextFromWrangler(!isBuild && isProduction)
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, PageIntro, TourPages, TourProducts, PromoPages, EventPages, ContentPanels, BookingEnquiry, AdventurePromo],
  globals: [HomePage, AboutPage, RiskDisclosurePage, ContactPage],
  editor: lexicalEditor(),
  email: resendAdapter({
    defaultFromAddress: 'info@wellingtonrafting.nz',
    defaultFromName: 'Wellington Rafting',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Schema is managed by migrations (see src/migrations/ and `payload migrate`).
  // Dev-time schema push is disabled: it misdetects diffs against
  // migration-built databases (e.g. a production sync) and crashes boot
  // trying to re-create indexes that already exist. It must also never
  // run against the remote DB via `dev-remote`.
  db: sqliteD1Adapter({ binding: cloudflare.env.D1, push: false }),
  logger: isProduction ? cloudflareLogger : undefined,
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    nestedDocsPlugin({
      collections: ['event-pages'],
      generateURL: (docs) =>
        docs.reduce((url, doc) => (doc.slug ? `${url}/${doc.slug}` : url), ''),
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(
  remoteBindings: boolean = isProduction,
): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings,
      } satisfies GetPlatformProxyOptions),
  )
}
