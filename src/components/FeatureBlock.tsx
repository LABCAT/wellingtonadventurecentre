'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlurhashCanvas } from 'react-blurhash'
import type { Media } from '@/payload-types'

interface FeatureBlockProps {
  image: number | Media
  blurhash?: string | null
  heading: string
  headingLevel?: 'h2' | 'h3' | null
  link?: string | null
  content?: string | null
  imagePosition?: 'left' | 'right' | null
  verticalImagePosition?: 'top' | 'center' | 'bottom' | null
}

const FeatureBlock = ({
  image,
  blurhash,
  heading,
  headingLevel = 'h2',
  link,
  content,
  imagePosition = 'left',
  verticalImagePosition = 'center',
}: FeatureBlockProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageHolderRef = useRef<HTMLDivElement | null>(null)
  const [imageOnScreen, setImageOnScreen] = useState(false)
  const media = typeof image === 'object' ? image : null
  const Heading = headingLevel === 'h3' ? 'h3' : 'h2'

  useEffect(() => {
    const section = sectionRef.current

    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    section.classList.add('feature-block--animate')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        section.classList.add('feature-block--visible')
        observer.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const holder = imageHolderRef.current
    if (!holder) {
      return
    }

    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        setImageOnScreen(entry?.isIntersecting ?? false)
      },
      { rootMargin: '0px' },
    )

    imageObserver.observe(holder)

    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`feature-block feature-block--${imagePosition ?? 'left'} feature-block--${verticalImagePosition ?? 'center'}`}
    >
      <div className="feature-block__inner container container--wide">
        {media?.url && (
          <div className="feature-block__image-holder" ref={imageHolderRef}>
            {blurhash && (
              <BlurhashCanvas
                hash={blurhash}
                width={32}
                height={32}
                className="feature-block__image-blur"
              />
            )}
            <Image
              src={media.url}
              alt={media.alt ?? ''}
              width={media.width ?? 1000}
              height={media.height ?? 667}
              className={`feature-block__image${imageOnScreen ? ' feature-block__image--on-screen' : ''}`}
              sizes="(max-width: 575px) 576px, (max-width: 767px) 704px, (max-width: 1199px) 800px, (max-width: 1399px) 735px, 1000px"
            />
          </div>
        )}
        <div className="feature-block__content">
          <Heading className="feature-block__heading">{heading}</Heading>
          {content && <p className="feature-block__body">{content}</p>}
          {link && (
            <Link
              href={link}
              className="button feature-block__cta"
              aria-label={`Find out more about ${heading}`}
            >
              Find Out More
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeatureBlock
