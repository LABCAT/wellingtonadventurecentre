import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Fragment } from 'react'
import SiteTitle from './SiteTitle'
import { getImageAltText } from '@/lib/imageAltText'
import { taglineLines } from '@/lib/tagline'
import BlurhashCanvas from './BlurhashCanvas'
import HeroImage from './HeroImage'
import EventPromo from './EventPromo'

const HeroBannerVideo = dynamic(() => import('./HeroBannerVideo'))

interface HeaderProps {
  title?: string
  slug?: string
  heroImage?: string
  heroImageMobBGPos?: string
  isHomePage?: boolean
  isContactPage?: boolean
  tagline?: string | null
}

const Header = ({
  title,
  slug,
  // WAC-TODO: currently a WR placeholder asset copied for parity; replace
  // with a WAC hero image in public/images/hero-banners/.
  heroImage = 'Wellington-Rafting-Hero-Video-Cover.webp',
  heroImageMobBGPos = 'center',
  isHomePage,
  isContactPage,
  tagline,
}: HeaderProps) => {
  const pageType = isHomePage ? 'HomePage' : isContactPage ? 'ContactPage' : 'Page'
  // `battle-of-the-paddles` is a Wellington Rafting event; WAC-TODO: remove or
  // repoint to a WAC event slug and replace the videos under public/videos/.
  const showHeroBanner = pageType === 'HomePage' || slug === 'battle-of-the-paddles'
  const heroVideo = slug === 'battle-of-the-paddles'
    ? '/videos/Battle-Of-The-Paddles-Hero-Video.mp4'
    : '/videos/Wellington-Rafting-Hero-Video.mp4'

  return (
    <header
      className="site-header site-header--HomePage"
      itemType="https://schema.org/WPHeader"
      itemScope
    >
      <div className="site-header__nav">
        <SiteTitle pageType={pageType} />
      </div>
      {showHeroBanner ? (
        <>
          <div className="hero-banner">
            <BlurhashCanvas
              hash="LLG[J]?wlBNN00R4Mws*%c9cr]n~"
              width={32}
              height={32}
              className="hero-banner__blur"
            />
            <Image
              src={'/images/hero-banners/' + heroImage}
              alt={getImageAltText(heroImage)}
              width={1920}
              height={1080}
              className="hero-banner__image"
              priority
            />
            <HeroBannerVideo videoURL={heroVideo} />
          </div>
          {pageType === 'HomePage' ? (
            <blockquote className="site-header__tagline">
              {taglineLines(tagline).map((line, i, arr) => (
                <Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </Fragment>
              ))}
            </blockquote>
          ) : (
            <EventPromo title={title ?? ''} />
          )}
        </>
      ) : (
        <>
          <HeroImage
            heroImage={heroImage}
            heroImageMobBGPos={heroImageMobBGPos}
            isContactPage={isContactPage}
          />
          <h1 className="site-header__tagline">{title}</h1>
        </>
      )}
    </header>
  )
}

export default Header
