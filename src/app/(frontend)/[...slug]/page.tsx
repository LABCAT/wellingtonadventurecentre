import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import NestedPageContent from './NestedPageContent'

const getPage = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()
  const { docs } = await payload.find({
    collection: 'pages',
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
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug.at(-1) ?? '')
  if (!page) return {}
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || undefined,
  }
}

export default async function NestedPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const page = await getPage(slug.at(-1) ?? '')

  if (!page) return notFound()

  return <NestedPageContent initialData={page} />
}
