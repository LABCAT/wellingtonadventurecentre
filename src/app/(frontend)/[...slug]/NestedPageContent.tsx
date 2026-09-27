'use client'

import { RefreshRouteOnSave, useLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { Header, PageIntro, ContentBlocks, Spacer } from '@/components'
import { mediaURL } from '@/lib/media'
import type { Page } from '@/payload-types'

const NestedPageContent = ({ initialData }: { initialData: Page }) => {
  const router = useRouter()
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data: page } = useLivePreview<Page>({
    initialData,
    serverURL,
    depth: 2,
  })

  return (
    <>
      <RefreshRouteOnSave serverURL={serverURL} refresh={() => router.refresh()} />
      <Header
        title={page.title}
        heroImage={mediaURL(page.heroImage) ?? undefined}
        heroImageMobBGPos={page.heroImageMobilePosition ?? 'center'}
      />
      <main className="main">
        <PageIntro title={page.introTitle} content={page.intro} />
        {!page.blocks?.length && <Spacer />}
        <ContentBlocks blocks={page.blocks} />
        {page.blocks?.length ? <Spacer /> : null}
      </main>
    </>
  )
}

export default NestedPageContent
