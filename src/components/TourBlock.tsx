'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlurhashCanvas } from 'react-blurhash'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media, HomePage } from '@/payload-types'

type TourBlockData = Extract<
  NonNullable<HomePage['blocks']>[number],
  { blockType: 'tourBlock' }
>

type TourBlockProps = Omit<TourBlockData, 'blockType' | 'blockName' | 'id'> & {
  image: number | Media
}

const TourBlock = ({
  image,
  blurhash,
  heading,
  description,
  pricingInfo,
  fareharborUrl,
  moreInfoUrl,
  showDiscounts = false,
  imagePosition = 'left',
  verticalImagePosition = 'center',
}: TourBlockProps) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [onScreen, setOnScreen] = useState(false)
  const media = typeof image === 'object' ? image : null

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry?.isIntersecting ?? false)
      },
      { rootMargin: '0px' },
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current

    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    section.classList.add('tour-info--animate')

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        section.classList.add('tour-info--visible')
        revealObserver.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    revealObserver.observe(section)

    return () => revealObserver.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`tour-info tour-info--${imagePosition ?? 'left'} tour-info--${verticalImagePosition ?? 'center'}`}
    >
      <div className="tour-info__inner container container--wide">
        <div className="tour-info__image-holder" ref={imageRef}>
          <BlurhashCanvas
            hash={blurhash || 'LLG[J]?wlBNN00R4Mws*%c9cr]n~'}
            width={32}
            height={32}
            className="tour-info__image-blur"
          />
          {media?.url && (
            <Image
              src={media.url}
              alt={media.alt ?? ''}
              width={media.width ?? 1000}
              height={media.height ?? 667}
              className={`tour-info__image${onScreen ? ' tour-info__image--on-screen' : ''}`}
            />
          )}
        </div>
        <div className="tour-info__content">
          <h2 className="tour-info__heading">{heading}</h2>
          {description && (
            <div className="tour-info__features">
              <RichText data={description} />
            </div>
          )}
          <div className="tour-info__booking">
            <div className="tour-info__actions">
              {fareharborUrl ? (
                <a
                  className="button tour-info__cta"
                  href={fareharborUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Now
                </a>
              ) : (
                // WAC-TODO: replace with the Wellington Adventure Centre booking phone number.
                <a className="button tour-info__cta" href="tel:+64000000000" rel="noreferrer">
                  Call Now
                </a>
              )}
              {moreInfoUrl && (
                <Link
                  className="button button--alt button--small tour-info__cta"
                  href={moreInfoUrl}
                  aria-label={`Find out more about ${heading}`}
                >
                  Find Out More
                </Link>
              )}
            </div>
            {pricingInfo && <div className="tour-info__pricing">{pricingInfo}</div>}
          </div>
          {showDiscounts && (
            <p className="tour-info__additional-info">Discounts are available for large groups.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default TourBlock
