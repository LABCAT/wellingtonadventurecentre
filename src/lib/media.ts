import type { Media } from '@/payload-types'

export const mediaURL = (media?: number | Media | null): string | null =>
  media && typeof media === 'object' ? (media.url ?? null) : null
