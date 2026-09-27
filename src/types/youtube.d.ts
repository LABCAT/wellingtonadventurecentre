interface YouTubePlayer {
  loadVideoById: (videoId: string) => void
  setVolume: (volume: number) => void
  mute: () => void
  playVideo: () => void
  stopVideo: () => void
}

interface Window {
  onYouTubeIframeAPIReady?: () => void
  YT?: {
    Player: new (
      element: string | HTMLElement,
      options: {
        videoId?: string
        playerVars?: Record<string, unknown>
        events?: {
          onReady?: (event: { target: YouTubePlayer }) => void
          onStateChange?: (event: { data: number }) => void
        }
      },
    ) => YouTubePlayer
    loaded?: boolean
  }
}
