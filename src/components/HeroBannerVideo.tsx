'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroBannerVideoProps {
  videoURL?: string
}

// WAC-TODO: WR placeholder video copied for parity; replace with the WAC hero video.
const HeroBannerVideo = ({ videoURL = '/videos/Wellington-Rafting-Hero-Video.mp4' }: HeroBannerVideoProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // loadeddata may have fired before hydration attached any handler;
    // check readyState first so the video is never stuck at opacity 0.
    if (video.readyState >= 2) {
      setVideoLoaded(true)
      return
    }

    const onLoadedData = () => setVideoLoaded(true)
    video.addEventListener('loadeddata', onLoadedData)
    return () => video.removeEventListener('loadeddata', onLoadedData)
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="hero-banner__video"
      style={{ opacity: videoLoaded ? 1 : 0 }}
    >
      <source src={videoURL} type="video/mp4" />
    </video>
  )
}

export default HeroBannerVideo
