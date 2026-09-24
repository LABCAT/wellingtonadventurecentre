import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const EventPages: CollectionConfig = {
  slug: 'event-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    { name: 'title', type: 'textarea', required: true },
    slugField(),
    { name: 'hero_image', type: 'text', label: 'Hero Image Path' },
    { name: 'hero_image_blur_hash', type: 'text' },
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
      name: 'content_panels',
      type: 'relationship',
      relationTo: 'content-panels',
      hasMany: true,
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
