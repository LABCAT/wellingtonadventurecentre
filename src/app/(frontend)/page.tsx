import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import HomePageContent from './HomePageContent'

const getHomePage = cache(async () => {
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()
  return payload.findGlobal({ slug: 'home-page', depth: 2, draft: isDraft })
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

  return <HomePageContent initialData={page} />
}
