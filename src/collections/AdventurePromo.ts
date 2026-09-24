import type { CollectionConfig } from 'payload'

export const AdventurePromo: CollectionConfig = {
  slug: 'adventure-promo',
  admin: {
    useAsTitle: 'heading',
    hidden: true,
  },
  fields: [
    { name: 'heading', type: 'text', label: 'Heading' },
    {
      name: 'style',
      type: 'select',
      options: ['left', 'right'],
      defaultValue: 'left',
    },
    { name: 'intro', type: 'textarea', label: 'Intro' },
    { name: 'hero_image', type: 'text', label: 'Hero Image Path (e.g. /images/...)' },
    { name: 'sidekick_image', type: 'text', label: 'Sidekick Image Path' },
    {
      name: 'tours',
      type: 'array',
      fields: [
        { name: 'link', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}
