import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const ContactUs: GlobalConfig = {
  slug: 'contact-us',
  versions: {
    drafts: true,
  },
  admin: {
    livePreview: {
      url: () => '/contact',
    },
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Contact Us' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero Image' },
    {
      name: 'heroImageMobilePosition',
      type: 'select',
      label: 'Hero Image Mobile Background Position',
      options: ['center', 'left', 'right'],
      defaultValue: 'center',
    },
    { name: 'metaDescription', type: 'text', label: 'Meta Description' },
    {
      name: 'emailAddress',
      type: 'email',
      label: 'Admin Email Address',
      admin: {
        description: 'Email address that will receive booking enquiry notification emails.',
      },
    },
  ],
}
