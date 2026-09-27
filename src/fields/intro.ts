import type { Field } from 'payload'
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

export const introFields: Field[] = [
  {
    name: 'introTitle',
    type: 'textarea',
    label: 'Intro Title',
    admin: {
      description: 'Heading shown above the intro copy.',
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
]
