import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import ContactPageContent from './ContactPageContent'

const getContactUs = cache(async () => {
  const payload = await getPayload({ config })
  const { isEnabled: isDraft } = await draftMode()
  return payload.findGlobal({ slug: 'contact-us', draft: isDraft })
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactUs()
  return {
    title: page.title || 'Contact Us',
    description: page.metaDescription || undefined,
  }
}

export default async function ContactUsPage() {
  const page = await getContactUs()

  return <ContactPageContent initialData={page} />
}
