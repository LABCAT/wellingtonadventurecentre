import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, waitFor, cleanup } from '@testing-library/react'
import { createElement } from 'react'
import HeroBannerVideo from '@/components/HeroBannerVideo'

const setReadyState = (value: number) => {
  Object.defineProperty(HTMLMediaElement.prototype, 'readyState', {
    configurable: true,
    get: () => value,
  })
}

describe('HeroBannerVideo', () => {
  beforeEach(() => {
    setReadyState(0)
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('stays hidden (opacity 0) until the video has data', () => {
    const { container } = render(createElement(HeroBannerVideo))
    const video = container.querySelector('video') as HTMLVideoElement
    expect(video).not.toBeNull()
    expect(video.style.opacity).toBe('0')
    // React sets muted as a DOM property (not a content attribute) on client renders
    expect(video.muted).toBe(true)
    expect(video.autoplay).toBe(true)
    expect(video.getAttribute('loop')).not.toBeNull()
    expect(video.getAttribute('playsinline')).not.toBeNull()
    expect(video.querySelector('source')?.getAttribute('src')).toBe(
      '/videos/Wellington-Rafting-Hero-Video.mp4',
    )
  })

  it('reveals when loadeddata fires after mount (listener attached)', async () => {
    const { container } = render(createElement(HeroBannerVideo))
    const video = container.querySelector('video') as HTMLVideoElement
    expect(video.style.opacity).toBe('0')

    video.dispatchEvent(new Event('loadeddata'))

    await waitFor(() => expect(video.style.opacity).toBe('1'))
  })

  it('reveals immediately when the video was already loaded before hydration (missed-event race)', async () => {
    // Simulates loadeddata firing between SSR and hydration: readyState is
    // already HAVE_ENOUGH_DATA (>=2) when the effect runs, with no event to come.
    setReadyState(4)

    const { container } = render(createElement(HeroBannerVideo))
    const video = container.querySelector('video') as HTMLVideoElement

    await waitFor(() => expect(video.style.opacity).toBe('1'))
  })

  it('accepts a custom video URL', () => {
    const { container } = render(
      createElement(HeroBannerVideo, { videoURL: '/videos/custom.mp4' }),
    )
    const video = container.querySelector('video') as HTMLVideoElement
    expect(video.querySelector('source')?.getAttribute('src')).toBe('/videos/custom.mp4')
  })

  it('does not flip to visible on unrelated events', async () => {
    const { container } = render(createElement(HeroBannerVideo))
    const video = container.querySelector('video') as HTMLVideoElement

    video.dispatchEvent(new Event('loadstart'))
    video.dispatchEvent(new Event('canplay'))
    video.dispatchEvent(new Event('timeupdate'))

    // Give React a turn; opacity must remain 0 without loadeddata
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(video.style.opacity).toBe('0')
  })
})
