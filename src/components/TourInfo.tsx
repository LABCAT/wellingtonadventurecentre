'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { BlurhashCanvas } from 'react-blurhash'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getImageAltText } from '@/lib/imageAltText'

interface TourInfoProps {
  hero_image?: string
  hero_image_blur_hash?: string
  image_alignment?: string
  vertical_image_alignment?: string
  title?: string
  description?: any
  pricing_info?: string
  fareharbour_url?: string
  show_discounts?: boolean
  sort?: string | number
}

const TourInfo = ({
  hero_image,
  hero_image_blur_hash,
  image_alignment,
  vertical_image_alignment,
  title,
  description,
  pricing_info,
  fareharbour_url,
  show_discounts,
  sort,
}: TourInfoProps) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(false)
  const blurHash = hero_image_blur_hash || 'LLG[J]?wlBNN00R4Mws*%c9cr]n~'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting)
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

  return (
    <section
      className={`tour-info tour-info--${image_alignment} tour-info--${vertical_image_alignment}`}
      id={String(sort)}
    >
      <div className="tour-info__inner container container--wide">
        <div className="tour-info__image-holder" ref={imageRef}>
          <BlurhashCanvas
            hash={blurHash}
            width={32}
            height={32}
            className="tour-info__image-blur"
          />
          {hero_image && (
            <Image
              src={hero_image}
              alt={getImageAltText(hero_image)}
              width={1000}
              height={667}
              className={`tour-info__image${onScreen ? ' tour-info__image--on-screen' : ''}`}
            />
          )}
        </div>
        <div className="tour-info__content">
          <h2 className="tour-info__heading">{title}</h2>
          {description && (
            <div className="tour-info__features">
              <RichText data={description} />
            </div>
          )}
          <div className="tour-info__booking">
            {fareharbour_url ? (
              <a
                className="button tour-info__cta"
                href={fareharbour_url}
                target="_blank"
                rel="noreferrer"
              >
                Book Now
              </a>
            ) : (
              <a className="button tour-info__cta" href="tel:+64204723848" rel="noreferrer">
                Call Now
              </a>
            )}
            <div className="tour-info__pricing">{pricing_info}</div>
          </div>
          {show_discounts && (
            <p className="tour-info__additional-info">Discounts are available for large groups.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default TourInfo
