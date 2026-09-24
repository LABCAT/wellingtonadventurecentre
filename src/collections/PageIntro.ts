import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  OrderedListFeature,
  LinkFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const PageIntro: CollectionConfig = {
  slug: 'page-intro',
  admin: {
    useAsTitle: 'title',
    hidden: true,
  },
  fields: [
    { name: 'title', type: 'textarea', label: 'Title' },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          OrderedListFeature(),
          LinkFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
}
