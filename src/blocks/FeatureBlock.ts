import type { Block } from 'payload'
import { blurhashField } from '../fields/blurhash'

export const FeatureBlock: Block = {
  slug: 'featureBlock',
  labels: {
    singular: 'Feature Block',
    plural: 'Feature Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    blurhashField('Placeholder blur shown while the image loads. Auto-generated from the image.'),
    {
      name: 'headingLevel',
      type: 'select',
      label: 'Heading Level',
      options: [
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
      ],
      defaultValue: 'h2',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Body Copy',
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
