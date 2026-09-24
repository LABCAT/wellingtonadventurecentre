import React from 'react'
import Script from 'next/script'
import { SiteBackground, Footer } from '@/components'
import { openSans, rokkitt } from './fonts'
import '@/styles/index.scss'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Wellington Rafting',
  description: 'Wellington Rafting - White Water Rafting Adventures in Wellington, New Zealand',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-nz" className={`${openSans.variable} ${rokkitt.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5TJLVJ2" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
        <SiteBackground />
        {children}
        <Footer />
        <Script
          src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5TJLVJ2');`}
        </Script>
        <Script
          src="https://www.youtube.com/iframe_api"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
