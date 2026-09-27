'use client'

import { RefreshRouteOnSave, useLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { Header, Spacer } from '@/components'
import { mediaURL } from '@/lib/media'
import type { ContactUs } from '@/payload-types'
import ContactForm from './ContactForm'

const ContactPageContent = ({ initialData }: { initialData: ContactUs }) => {
  const router = useRouter()
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data: page } = useLivePreview<ContactUs>({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <>
      <RefreshRouteOnSave serverURL={serverURL} refresh={() => router.refresh()} />
      <Header
        title={page.title || 'Contact Us'}
        heroImage={mediaURL(page.heroImage) ?? undefined}
        heroImageMobBGPos={page.heroImageMobilePosition ?? 'center'}
        isContactPage={true}
      />
      <main className="main">
        <ContactForm />
        <Spacer />
      </main>
    </>
  )
}

export default ContactPageContent
