import type { Block } from 'payload'
import { blurhashField } from '../fields/blurhash'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
  fields: [
    {
      name: 'youtubeId',
      type: 'text',
      label: 'YouTube Video ID',
      required: true,
      admin: {
        description: 'YouTube video id, e.g. dQw4w9WgXcQ.',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster / Fallback Image',
      admin: {
        description: 'Cover image shown over the video until it is played.',
      },
    },
    blurhashField('Placeholder blur shown while the poster loads. Auto-generated from the poster.'),
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Optional heading shown above the video.',
      },
    },
  ],
}
