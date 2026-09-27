import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import PromoPageContent from './PromoPageContent'

const getPromoPage = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()
  const { docs } = await payload.find({
    collection: 'promo-pages',
    draft: isDraft,
    where: isDraft
      ? { slug: { equals: slug } }
      : { slug: { equals: slug }, _status: { equals: 'published' } },
    depth: 2,
  })
  return docs[0] ?? null
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPromoPage(slug)
  if (!page) return {}
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || undefined,
  }
}

export default async function PromoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPromoPage(slug)

  if (!page) return notFound()

  return <PromoPageContent initialData={page} />
}
