'use client'

import { RefreshRouteOnSave, useLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { Header, PageIntro, ProductPromo, ContentBlocks, Spacer } from '@/components'
import type { HomePage } from '@/payload-types'

const HomePageContent = ({ initialData }: { initialData: HomePage }) => {
  const router = useRouter()
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data: page } = useLivePreview<HomePage>({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <>
      <RefreshRouteOnSave serverURL={serverURL} refresh={() => router.refresh()} />
      <Header
        isHomePage={true}
        // WAC-TODO: WR placeholder hero; replace with a WAC image in public/images/hero-banners/.
        heroImage="Wellington-Rafting-Hero-Video-Cover.webp"
        tagline={page?.tagline}
      />
      <main className="main">
        <PageIntro title={page?.introTitle} content={page?.intro} />
        {/* WAC-TODO: hardcoded gift-voucher promo (old-site parity). */}
        <ProductPromo promoImage="/images/hero-banners/Wellington-Rafting-Truck-Billboard.jpg" />
        <ContentBlocks blocks={page?.blocks} />
        {page?.blocks?.length ? <Spacer /> : null}
      </main>
    </>
  )
}

export default HomePageContent
