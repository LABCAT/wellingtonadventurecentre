'use client'

import { useEffect, useState } from 'react'

interface HeroImageProps {
  heroImage: string
  heroImageMobBGPos: string
  isContactPage?: boolean
}

const HeroImage = ({ heroImage, heroImageMobBGPos, isContactPage }: HeroImageProps) => {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [waterLoaded, setWaterLoaded] = useState(false)

  useEffect(() => {
    if (!heroImage) return
    const img = new window.Image()
    img.onload = () => setHeroLoaded(true)
    img.src = `/images/hero-banners/${heroImage}`
  }, [heroImage])

  useEffect(() => {
    if (!isContactPage) return
    const img = new window.Image()
    img.onload = () => setWaterLoaded(true)
    img.src = '/images/water-mask.webp'
  }, [isContactPage])

  return (
    <>
      <div
        className={`home-hero${heroLoaded ? ' home-hero--loaded' : ''} home-hero--mob-bg-pos-${heroImageMobBGPos}`}
        style={{
          backgroundImage: heroImage ? `url(/images/hero-banners/${heroImage})` : 'none',
        }}
      />
      {isContactPage && (
        <div
          className={`water-mask${heroLoaded && waterLoaded ? ' water-mask--loaded' : ''} water-mask--mob-bg-pos-${heroImageMobBGPos}`}
        >
          <svg>
            <filter id="turbulence" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                id="sea-filter"
                numOctaves={3}
                seed={2}
                baseFrequency="0.05 0.02"
              />
              <feDisplacementMap scale={5} in="SourceGraphic" />
            </filter>
            <animate
              xlinkHref="#sea-filter"
              attributeName="baseFrequency"
              dur="60s"
              keyTimes="0;0.5;1"
              values="0.02 0.06;0.04 0.08;0.02 0.06"
              repeatCount="indefinite"
            />
          </svg>
        </div>
      )}
    </>
  )
}

export default HeroImage
