'use client'

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { BlurhashCanvas } from 'react-blurhash'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Media } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

interface VideoBlockProps {
  youtubeId: string
  poster?: number | Media | null
  blurhash?: string | null
  heading?: string | null
}

const VideoBlock = ({ youtubeId, poster, blurhash, heading }: VideoBlockProps) => {
  const posterMedia = poster && typeof poster === 'object' ? poster : null
  const playerRef = useRef<YouTubePlayer | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  const activateVideo = useCallback(() => {
    const section = sectionRef.current
    if (!youtubeId || !section) return

    if (!playerRef.current) {
      const container = section.querySelector('.video__container')
      if (!container) return
      const coverEl = container.querySelector('.video__cover')

      const onPlayerReady = (event: { target: YouTubePlayer }) => {
        event.target.setVolume(10)
        playerRef.current = event.target
        if (coverEl) {
          coverEl.classList.add('video__cover--video-ready')
        }
      }

      if (!container.querySelector('.video__iframe')) {
        const playerEl = document.createElement('div')
        playerEl.setAttribute('id', `yt-${youtubeId}`)
        playerEl.classList.add('video__iframe')
        container.appendChild(playerEl)
      }

      if (!window.YT) return
      new window.YT.Player(`yt-${youtubeId}`, {
        videoId: youtubeId,
        playerVars: { rel: 0, autoplay: 1, mute: 1 },
        events: { onReady: onPlayerReady },
      })
    } else {
      playerRef.current.loadVideoById(youtubeId)
    }
  }, [youtubeId])

  useEffect(() => {
    if (!youtubeId) return
    window.onYouTubeIframeAPIReady = () => {
      activateVideo()
    }

    if (typeof window.YT !== 'undefined' && window.YT.loaded) {
      activateVideo()
    }
  }, [youtubeId, activateVideo])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const scaleFrom = window.innerWidth >= 768 ? 0.25 : 1

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.video__container'),
        { scale: scaleFrom },
        {
          scale: 1,
          scrollTrigger: {
            trigger: section.querySelector('.video__trigger'),
            onEnter: () => {
              if (playerRef.current) {
                playerRef.current.mute()
                playerRef.current.playVideo()
              }
            },
            scrub: true,
            markers: false,
            start: 'top center',
            end: 'center center',
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  if (!youtubeId) {
    return null
  }

  return (
    <section className="video" ref={sectionRef}>
      {heading && <h2 className="video__heading">{heading}</h2>}
      <div className="video__trigger">
        <div className="video__container">
          {posterMedia?.url ? (
            <>
              <BlurhashCanvas
                hash={blurhash || 'LLG[J]?wlBNN00R4Mws*%c9cr]n~'}
                width={32}
                height={32}
                className="video__cover-blur"
              />
              <Image
                src={posterMedia.url}
                alt={posterMedia.alt ?? ''}
                width={posterMedia.width ?? 1600}
                height={posterMedia.height ?? 900}
                className="video__cover"
              />
            </>
          ) : (
            <div className="video__cover"></div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoBlock
