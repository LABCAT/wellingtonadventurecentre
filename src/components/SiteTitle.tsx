import React from 'react'
import Link from 'next/link'
import Logo from './Logo'

interface SiteTitleProps {
  pageType?: string
}

const SiteTitle = ({ pageType }: SiteTitleProps) => {
  const logoLink = (
    <Link href="/" className="site-title__link">
      <span className="sr-only">Wellington Adventure Centre</span>
      <Logo className="site-title__logo" />
    </Link>
  )

  return pageType === 'HomePage' ? (
    <h1 className="site-title">{logoLink}</h1>
  ) : (
    <div className="site-title">{logoLink}</div>
  )
}

export default SiteTitle
