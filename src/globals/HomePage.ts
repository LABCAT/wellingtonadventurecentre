import type { GlobalConfig } from 'payload'
import { FeatureBlock } from '../blocks/FeatureBlock'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Wellington Rafting' },
    { name: 'meta_description', type: 'text', label: 'Meta Description' },
    {
      name: 'intro',
      type: 'relationship',
      relationTo: 'page-intro',
      hasMany: false,
    },
    {
      name: 'show_adventure_promos',
      type: 'checkbox',
      label: 'Show Adventure Promos',
      defaultValue: true,
    },
    {
      name: 'promos',
      type: 'relationship',
      relationTo: 'adventure-promo',
      hasMany: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content Blocks',
      blocks: [FeatureBlock],
    },
  ],
}
