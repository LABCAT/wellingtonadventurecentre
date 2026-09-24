import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, Spacer } from '@/components'

export const metadata: Metadata = {
  title: 'Tours',
}

export default async function ToursPage() {
  const payload = await getPayload({ config })
  const { docs: pages } = await payload.find({
    collection: 'tour-pages',
    depth: 1,
  })

  return (
    <>
      <Header title="Tours" heroImage="Wellington-Rafting-Safety-Briefing.webp" />
      <main className="main">
        <section className="page-intro">
          <div className="mask-pattern mask-pattern--top"></div>
          <div className="container container--narrow">
            <h2 className="page-intro__heading">OUR TOURS</h2>
            <div className="page-intro__content">
              {pages.map((page) => (
                <p key={page.id}>
                  <Link href={`/tours/${page.slug}`}>{page.title}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="mask-pattern mask-pattern--bottom"></div>
        </section>
        <Spacer />
      </main>
    </>
  )
}
