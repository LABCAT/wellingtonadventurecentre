import type { HomePage, Page, PromoPage, TourPage } from '@/payload-types'
import FeatureBlock from './FeatureBlock'
import TourBlock from './TourBlock'
import VideoBlock from './VideoBlock'

type ContentBlock = NonNullable<
  Page['blocks'] | PromoPage['blocks'] | TourPage['blocks'] | HomePage['blocks']
>[number]

interface ContentBlocksProps {
  blocks?: ContentBlock[] | null
}

const ContentBlocks = ({ blocks }: ContentBlocksProps) => {
  if (!blocks?.length) {
    return null
  }

  return (
    <>
      {blocks.map((block, i) => {
        if (block.blockType === 'featureBlock') {
          return <FeatureBlock key={block.id ?? i} {...block} />
        }
        if (block.blockType === 'tourBlock') {
          return <TourBlock key={block.id ?? i} {...block} />
        }
        if (block.blockType === 'videoBlock') {
          return <VideoBlock key={block.id ?? i} {...block} />
        }
        return null
      })}
    </>
  )
}

export default ContentBlocks
