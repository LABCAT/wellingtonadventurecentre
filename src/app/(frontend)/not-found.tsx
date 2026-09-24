import React from 'react'
import Link from 'next/link'
import { Header, Spacer } from '@/components'

export default function NotFound() {
  return (
    <>
      <Header title="Page Not Found" heroImage="Wellington-Rafting-Safety-Briefing.webp" />
      <main className="main">
        <section className="page-intro">
          <div className="mask-pattern mask-pattern--top"></div>
          <div className="container container--narrow">
            <h2 className="page-intro__heading">404 - PAGE NOT FOUND</h2>
            <div className="page-intro__content">
              <p>Sorry, the page you are looking for does not exist.</p>
              <p><Link href="/">Return to Home</Link></p>
            </div>
          </div>
          <div className="mask-pattern mask-pattern--bottom"></div>
        </section>
        <Spacer />
      </main>
    </>
  )
}
