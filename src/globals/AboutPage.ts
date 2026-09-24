import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'About Us' },
    { name: 'hero_image', type: 'text', label: 'Hero Image Path (e.g. /images/...)' },
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
    {
      name: 'youtube_video',
      type: 'group',
      fields: [
        { name: 'youtube_id', type: 'text' },
        { name: 'video_cover', type: 'text' },
      ],
    },
  ],
}
