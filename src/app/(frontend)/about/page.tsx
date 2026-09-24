import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, PageIntro, Video, TeamMember } from '@/components'

const getAboutPage = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'about-page', depth: 2 })
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage()
  return {
    title: page.title || 'About Us',
    description: page.meta_description || undefined,
  }
}

export default async function AboutPage() {
  const page = await getAboutPage()

  return (
    <>
      <Header
        title={page.title || 'About Us'}
        heroImage={page.hero_image || 'Wellington-Rafting-Safety-Briefing.webp'}
        heroImageMobBGPos={page.hero_image_mobile_background_position || 'center'}
      />
      <main className="main">
        <PageIntro intro={page.intro} />
        <Video videoData={page.youtube_video} />
        <TeamMember />
      </main>
    </>
  )
}
