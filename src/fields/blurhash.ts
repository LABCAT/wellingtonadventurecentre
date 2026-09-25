import type { TextField } from 'payload'

/**
 * Read-only blurhash string field with a browser-side auto-generate
 * admin component (no sharp, so safe on Cloudflare Workers).
 *
 * On blocks (path `*.blurhash`) the component encodes the sibling
 * `image` upload field. On the Media collection itself (path
 * `blurhash`) it encodes the document's own `url`.
 */
export const blurhashField = (description?: string): TextField => ({
  name: 'blurhash',
  type: 'text',
  label: 'Blurhash',
  admin: {
    description:
      description ??
      'Placeholder blur shown while the image loads. Auto-generated from the image.',
    components: {
      Field: '/components/BlurhashField',
    },
  },
})
