import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, PageIntro, Spacer } from '@/components'

const getRiskDisclosurePage = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'risk-disclosure-page', depth: 2 })
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getRiskDisclosurePage()
  return {
    title: page.title || 'Risk Disclosure',
    description: page.meta_description || undefined,
  }
}

export default async function RiskDisclosurePage() {
  const page = await getRiskDisclosurePage()

  return (
    <>
      <Header
        title={page.title || 'Risk Disclosure'}
        heroImage={page.hero_image || 'Wellington-Rafting-Safety-Briefing.webp'}
        heroImageMobBGPos={page.hero_image_mobile_background_position || 'center'}
      />
      <main className="main">
        <PageIntro intro={page.intro} />
        <Spacer />
      </main>
    </>
  )
}
