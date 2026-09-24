import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const TourProducts: CollectionConfig = {
  slug: 'tour-products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    group: 'Tour Pages',
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
    { name: 'description', type: 'richText', editor: lexicalEditor() },
    { name: 'pricing_info', type: 'text' },
    { name: 'fareharbour_url', type: 'text', label: 'FareHarbour URL' },
    { name: 'show_discounts', type: 'checkbox', defaultValue: false },
    { name: 'sort', type: 'number' },
  ],
}
