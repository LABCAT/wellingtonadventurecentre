import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Contact Us' },
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
      name: 'email_address',
      type: 'email',
      label: 'Admin Email Address',
      admin: {
        description: 'Email address that will receive booking enquiry notification emails.',
      },
    },
  ],
}
