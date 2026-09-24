import type { GlobalConfig } from 'payload'

export const RiskDisclosurePage: GlobalConfig = {
  slug: 'risk-disclosure-page',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Risk Disclosure' },
    { name: 'hero_image', type: 'text', label: 'Hero Image Path' },
    {
      name: 'hero_image_mobile_background_position',
      type: 'select',
      label: 'Hero Image Mobile Background Position',
      options: ['center', 'left', 'right'],
      defaultValue: 'center',
    },
    { name: 'meta_description', type: 'text', label: 'Meta Description' },
    {
      name: 'intro',
      type: 'relationship',
      relationTo: 'page-intro',
      hasMany: false,
    },
  ],
}
