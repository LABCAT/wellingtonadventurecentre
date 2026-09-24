import type { Block } from 'payload'

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
    {
      name: 'heading_level',
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
      name: 'image_position',
      type: 'select',
      label: 'Image Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'vertical_image_position',
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
