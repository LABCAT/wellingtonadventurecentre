import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, PageIntro, AdventurePromo, ProductPromo, GroupsPromo, FeatureBlock, Spacer } from '@/components'

const getHomePage = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'home-page', depth: 3 })
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  return {
    title: page.title || 'Wellington Rafting',
    description: page.meta_description || undefined,
  }
}

export default async function HomePage() {
  const page = await getHomePage()
  const hasFeatureBlocks = page?.blocks?.some((block) => block.blockType === 'featureBlock')

  return (
    <>
      <Header
        isHomePage={true}
        heroImage="Wellington-Rafting-Hero-Video-Cover.webp"
      />
      <main className="main">
        <PageIntro intro={page?.intro}>
          <GroupsPromo />
          <div className="page-intro__cta">
            <a
              href="https://fareharbor.com/embeds/book/wellingtonrafting/?full-items=yes"
              target="_blank"
              rel="noreferrer"
              className="page-intro__cta-button button"
            >
              Book Now
            </a>
            <a href="/contact" className="page-intro__cta-button button">
              Contact Us
            </a>
          </div>
        </PageIntro>
        <ProductPromo promoImage="/images/hero-banners/Wellington-Rafting-Truck-Billboard.webp" />
        {(page?.show_adventure_promos !== false) && page?.promos && page.promos.map((promo: any, i: number) => (
          <AdventurePromo {...promo} key={i} />
        ))}
        {page?.show_adventure_promos === false && hasFeatureBlocks && page.blocks.map((block, i) => {
          if (block.blockType === 'featureBlock') {
            return <FeatureBlock key={block.id ?? i} {...block} />
          }
          return null
        })}
        {page?.show_adventure_promos === false && hasFeatureBlocks && <Spacer />}
      </main>
    </>
  )
}
