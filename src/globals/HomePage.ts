import type { GlobalConfig } from 'payload'
import { FeatureBlock } from '../blocks/FeatureBlock'
import { TourBlock } from '../blocks/TourBlock'
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

export const HomePage: GlobalConfig = {
  slug: 'home-page',
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
    {
      name: 'introTitle',
      type: 'textarea',
      label: 'Intro Title',
      admin: {
        description: 'Heading shown above the homepage intro copy.',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      label: 'Intro',
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
      admin: {
        description: 'Intro copy shown below the hero banner.',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content Blocks',
      blocks: [FeatureBlock, TourBlock],
      admin: {
        description: 'Blocks rendered below the intro on the home page.',
      },
    },
  ],
}
