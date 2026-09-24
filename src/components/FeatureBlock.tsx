 'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

interface FeatureBlockProps {
  image: number | Media
  heading: string
  heading_level?: 'h2' | 'h3' | null
  link?: string | null
  content?: string | null
  image_position?: 'left' | 'right' | null
  vertical_image_position?: 'top' | 'center' | 'bottom' | null
}

const FeatureBlock = ({
  image,
  heading,
  heading_level = 'h2',
  link,
  content,
  image_position = 'left',
  vertical_image_position = 'center',
}: FeatureBlockProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const media = typeof image === 'object' ? image : null
  const Heading = heading_level === 'h3' ? 'h3' : 'h2'

  useEffect(() => {
    const section = sectionRef.current

    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    section.classList.add('feature-block--animate')

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) {
        return
      }

      section.classList.add('feature-block--visible')
      observer.disconnect()
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' })

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`feature-block feature-block--${image_position ?? 'left'} feature-block--${vertical_image_position ?? 'center'}`}
    >
      <div className="feature-block__inner container container--wide">
        {media?.url && (
          <div className="feature-block__image-holder">
            <Image
              src={media.url}
              alt={media.alt ?? ''}
              width={media.width ?? 1000}
              height={media.height ?? 667}
              className="feature-block__image"
              sizes="(max-width: 575px) 576px, (max-width: 767px) 704px, (max-width: 1199px) 800px, (max-width: 1399px) 735px, 1000px"
            />
          </div>
        )}
        <div className="feature-block__content">
          <Heading className="feature-block__heading">{heading}</Heading>
          {content && (
            <p className="feature-block__body">{content}</p>
          )}
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
