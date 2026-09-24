import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, PageIntro, ContentPanel, Spacer } from '@/components'

const getBattleOfThePaddlesParentId = cache(async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'event-pages',
    where: { slug: { equals: 'battle-of-the-paddles' } },
    depth: 0,
  })
  return docs[0]?.id ?? null
})

const getBattleOfThePaddlesSubPage = cache(async (slug: string) => {
  const parentId = await getBattleOfThePaddlesParentId()
  if (!parentId) return null
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'event-pages',
    where: {
      and: [
        { slug: { equals: slug } },
        { parent: { equals: parentId } },
      ],
    },
    depth: 2,
  })
  return docs[0] ?? null
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = await getBattleOfThePaddlesSubPage(slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.meta_description || undefined,
  }
}

export default async function BattleOfThePaddlesSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getBattleOfThePaddlesSubPage(slug)

  if (!page) return notFound()

  return (
    <>
      <Header
        title={page.title}
        heroImage={page.hero_image || 'Battle-Of-The-Paddles-Hero-Banner.webp'}
        heroImageMobBGPos={page.hero_image_mobile_background_position || 'center'}
      />
      <main className="main">
        <PageIntro intro={page.intro} />
        {page.content_panels && page.content_panels.map((contentPanel: any, index: number) => (
          <ContentPanel {...contentPanel} key={index} />
        ))}
        <Spacer />
      </main>
    </>
  )
}
