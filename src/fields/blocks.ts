import type { BlocksField } from 'payload'
import { FeatureBlock } from '../blocks/FeatureBlock'
import { TourBlock } from '../blocks/TourBlock'
import { VideoBlock } from '../blocks/VideoBlock'

export const contentBlocks = [FeatureBlock, TourBlock, VideoBlock]

export const contentBlocksField = (description?: string): BlocksField => ({
  name: 'blocks',
  type: 'blocks',
  label: 'Content Blocks',
  blocks: contentBlocks,
  admin: description ? { description } : undefined,
})
