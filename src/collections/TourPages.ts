import type { CollectionConfig } from 'payload'
import { authenticated, publishedOrAuthenticated } from '../access'
import { contentBlocksField } from '../fields/blocks'
import { pageScaffoldingFields } from '../fields/pageScaffolding'

export const TourPages: CollectionConfig = {
  slug: 'tour-pages',
  dbName: 'tour',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    livePreview: {
      url: ({ data }) => (data.slug ? `/tours/${data.slug}` : undefined),
    },
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [...pageScaffoldingFields, contentBlocksField('Blocks rendered on the tour page.')],
}
