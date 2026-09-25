import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { blurhashField } from '../fields/blurhash'

export const TourBlock: Block = {
  slug: 'tourBlock',
  labels: {
    singular: 'Tour Block',
    plural: 'Tour Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    blurhashField(),
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor(),
    },
    {
      name: 'pricingInfo',
      type: 'text',
      label: 'Pricing Info',
    },
    {
      name: 'fareharborUrl',
      type: 'text',
      label: 'FareHarbor URL',
      admin: {
        description: 'Booking link. Leave empty to show a Call Now button instead.',
      },
    },
    {
      name: 'moreInfoUrl',
      type: 'text',
      label: 'Find Out More URL',
      admin: {
        description: 'Tour page link. Leave empty to hide the Find Out More button.',
      },
    },
    {
      name: 'showDiscounts',
      type: 'checkbox',
      label: 'Show Discounts Note',
      defaultValue: false,
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'verticalImagePosition',
      type: 'select',
      label: 'Vertical Image Position',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
      defaultValue: 'center',
    },
  ],
}
