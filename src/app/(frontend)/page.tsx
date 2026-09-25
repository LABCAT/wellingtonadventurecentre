import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, PageIntro, FeatureBlock, TourBlock } from '@/components'

const getHomePage = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'home-page', depth: 2 })
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  return {
    title: page.title || 'Wellington Adventure Centre',
    description: page.metaDescription || undefined,
  }
}

export default async function HomePage() {
  const page = await getHomePage()

  return (
    <>
      <Header
        isHomePage={true}
        // WAC-TODO: WR placeholder hero; replace with a WAC image in public/images/hero-banners/.
        heroImage="Wellington-Rafting-Hero-Video-Cover.webp"
        tagline={page?.tagline}
      />
      <main className="main">
        <PageIntro title={page?.introTitle} content={page?.intro} />
        {page?.blocks?.map((block, i) => {
          if (block.blockType === 'featureBlock') {
            return <FeatureBlock key={block.id ?? i} {...block} />
          }
          if (block.blockType === 'tourBlock') {
            return <TourBlock key={block.id ?? i} {...block} />
          }
          return null
        })}
      </main>
    </>
  )
}
