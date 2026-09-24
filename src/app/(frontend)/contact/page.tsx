import React from 'react'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, Spacer } from '@/components'
import ContactForm from './ContactForm'

const getContactPage = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'contact-page' })
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()
  return {
    title: page.title || 'Contact Us',
    description: page.meta_description || undefined,
  }
}

export default async function ContactPage() {
  const page = await getContactPage()

  return (
    <>
      <Header
        title={page.title || 'Contact Us'}
        heroImage={page.hero_image || 'Wellington-Rafting-Hero-Video-Cover.webp'}
        heroImageMobBGPos={page.hero_image_mobile_background_position || 'center'}
        isContactPage={true}
      />
      <main className="main">
        <ContactForm />
        <Spacer />
      </main>
    </>
  )
}
