import type { Field } from 'payload'
import { slugField } from 'payload'
import { introFields } from './intro'

export const pageScaffoldingFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  slugField(),
  { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Image' },
  {
    name: 'heroImageMobilePosition',
    type: 'select',
    label: 'Hero Image Mobile Background Position',
    options: ['center', 'left', 'right'],
    defaultValue: 'center',
  },
  { name: 'metaTitle', type: 'text', label: 'Meta Title' },
  { name: 'metaDescription', type: 'text', label: 'Meta Description' },
  ...introFields,
]
