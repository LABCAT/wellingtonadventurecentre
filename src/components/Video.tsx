'use client'

import { useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getImageAltText } from '@/lib/imageAltText'

gsap.registerPlugin(ScrollTrigger)


interface VideoData {
  youtube_id?: string
  video_cover?: string
}

interface VideoProps {
  videoData?: VideoData
}

const Video = ({ videoData }: VideoProps) => {
  const videoID = videoData?.youtube_id
  const videoCover = videoData?.video_cover
  const playerRef = useRef<YouTubePlayer | null>(null)
  const videoContainer = useRef<HTMLDivElement>(null)

  const activateVideo = useCallback(() => {
    if (!videoID) return
    if (!playerRef.current) {
      const video = document.querySelector('.video__container')
      if (!video) return
      const coverEl = video.querySelector('.video__cover')

      const onPlayerReady = (event: { target: YouTubePlayer }) => {
        event.target.setVolume(10)
        playerRef.current = event.target
        if (coverEl) {
          coverEl.classList.add('video__cover--video-ready')
        }
      }

      const iframe = document.querySelector('.video__iframe')
      if (!iframe) {
        const videoDiv = document.createElement('div')
        videoDiv.setAttribute('id', videoID)
        videoDiv.classList.add('video__iframe')
        video.appendChild(videoDiv)
      }

      if (!window.YT) return
      new window.YT.Player(videoID, {
        videoId: videoID,
        playerVars: { rel: 0 },
        events: { onReady: onPlayerReady },
      })
    } else {
      playerRef.current.loadVideoById(videoID)
    }
  }, [videoID])

  useEffect(() => {
    if (!videoID) return
    window.onYouTubeIframeAPIReady = () => {
      activateVideo()
    }

    if (typeof window.YT !== 'undefined' && window.YT.loaded) {
      activateVideo()
    }
  }, [videoID, activateVideo])

  useLayoutEffect(() => {
    if (!videoContainer.current) return

    const scaleFrom = window.innerWidth >= 768 ? 0.25 : 1
    const scrollElement = videoContainer.current

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollElement.querySelector('.video__container'),
        { scale: scaleFrom },
        {
          scale: 1,
          scrollTrigger: {
            trigger: scrollElement.querySelector('.video__trigger'),
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

  if (!videoID) {
    return <></>
  }

  return (
    <section className="video" ref={videoContainer}>
      <div className="video__trigger">
        <div className="video__container">
          {videoCover ? (
            <Image
              src={videoCover}
              alt={getImageAltText(videoCover)}
              width={1600}
              height={900}
              className="video__cover"
            />
          ) : (
            <div className="video__cover"></div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Video
