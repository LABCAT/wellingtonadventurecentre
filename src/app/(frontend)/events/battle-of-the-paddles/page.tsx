import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, PageIntro, ContentPanel, EventSponsors, Spacer } from '@/components'

const getBattleOfThePaddlesPage = cache(async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'event-pages',
    where: { slug: { equals: 'battle-of-the-paddles' } },
    depth: 2,
  })
  return docs[0] ?? null
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBattleOfThePaddlesPage()
  if (!page) return {}
  return {
    title: page.title,
    description: page.meta_description || undefined,
  }
}

export default async function BattleOfThePaddlesPage() {
  const page = await getBattleOfThePaddlesPage()

  if (!page) return notFound()

  return (
    <>
      <Header
        title={page.title}
        slug="battle-of-the-paddles"
        heroImage={page.hero_image || 'Battle-Of-The-Paddles-Hero-Banner.webp'}
        heroImageMobBGPos={page.hero_image_mobile_background_position || 'center'}
      />
      <main className="main">
        <PageIntro intro={page.intro} />
        {page.content_panels && page.content_panels.map((contentPanel: any, index: number) => (
          <ContentPanel {...contentPanel} showCTA={index === 0} key={index} />
        ))}
        <EventSponsors />
        <Spacer />
      </main>
    </>
  )
}
