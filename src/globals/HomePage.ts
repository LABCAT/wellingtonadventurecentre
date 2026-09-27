import type { GlobalConfig } from 'payload'
import { contentBlocksField } from '../fields/blocks'
import { introFields } from '../fields/intro'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  versions: {
    drafts: true,
  },
  admin: {
    livePreview: {
      url: () => '/',
    },
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Wellington Adventure Centre' },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
      // WAC-TODO: replace with the final WAC hero tagline (line break = two lines).
      defaultValue: 'Wellington Adventure Centre\n[tagline copy placeholder]',
      admin: {
        description:
          'Hero tagline overlaid on the homepage video banner. Use a line break for two lines.',
      },
    },
    { name: 'metaDescription', type: 'text', label: 'Meta Description' },
    ...introFields,
    contentBlocksField('Blocks rendered below the intro on the home page.'),
  ],
}
