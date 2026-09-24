'use client'

import { useState } from 'react'

interface HeroBannerVideoProps {
  videoURL?: string
}

const HeroBannerVideo = ({ videoURL = '/videos/Wellington-Rafting-Hero-Video.mp4' }: HeroBannerVideoProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const onLoadedData = () => {
    setVideoLoaded(true)
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="hero-banner__video"
      style={{ opacity: videoLoaded ? 1 : 0 }}
      onLoadedData={onLoadedData}
    >
      <source src={videoURL} type="video/mp4" />
    </video>
  )
}

export default HeroBannerVideo
