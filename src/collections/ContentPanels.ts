import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  OrderedListFeature,
  UnorderedListFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const ContentPanels: CollectionConfig = {
  slug: 'content-panels',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
  },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'hero_image', type: 'text', label: 'Image Path' },
    { name: 'hero_image_blur_hash', type: 'text' },
    {
      name: 'image_alignment',
      type: 'select',
      options: ['left', 'right'],
      defaultValue: 'left',
    },
    {
      name: 'vertical_image_alignment',
      type: 'select',
      options: ['top', 'center', 'bottom'],
      defaultValue: 'center',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h3'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },
    { name: 'sort', type: 'number' },
  ],
}
