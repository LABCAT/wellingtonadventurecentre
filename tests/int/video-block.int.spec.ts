// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, cleanup, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import type { Media } from '@/payload-types'

const gsapMock = vi.hoisted(() => ({
  registerPlugin: vi.fn(),
  fromTo: vi.fn(),
  context: vi.fn(),
}))

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: gsapMock.registerPlugin,
    fromTo: gsapMock.fromTo,
    context: gsapMock.context,
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))
vi.mock('next/image', () => ({
  default: (props: { src?: string; alt?: string; className?: string }) =>
    createElement('img', { src: props.src, alt: props.alt, className: props.className }),
}))
vi.mock('react-blurhash', () => ({
  BlurhashCanvas: (props: { hash?: string; className?: string }) =>
    createElement('canvas', { className: props.className, 'data-hash': props.hash }),
}))

import VideoBlock from '@/components/VideoBlock'

const media = (overrides: Partial<Media> = {}): Media =>
  ({
    id: 1,
    alt: 'poster',
    url: '/media/poster.webp',
    width: 1600,
    height: 900,
    ...overrides,
  }) as Media

const makePlayer = () => ({
  setVolume: vi.fn(),
  mute: vi.fn(),
  playVideo: vi.fn(),
  loadVideoById: vi.fn(),
  stopVideo: vi.fn(),
})

describe('VideoBlock', () => {
  beforeEach(() => {
    gsapMock.context.mockImplementation((fn: () => void) => {
      fn()
      return { revert: vi.fn() }
    })
    gsapMock.fromTo.mockClear()
  })

  afterEach(() => {
    cleanup()
    delete (window as unknown as { YT?: unknown }).YT
    vi.clearAllMocks()
  })

  it('renders the section, poster cover and heading', () => {
    const { container, getByText } = render(
      createElement(VideoBlock, {
        youtubeId: 'abc',
        poster: media(),
        blurhash: 'LRE39j%L4nWC_Noe9Fay%gM|D%s:',
        heading: 'Watch this',
      }),
    )
    expect(container.querySelector('section.video')).not.toBeNull()
    expect(container.querySelector('img.video__cover')).not.toBeNull()
    expect(getByText('Watch this').tagName).toBe('H2')
  })

  it('renders the poster blur placeholder behind the cover', () => {
    const { container } = render(
      createElement(VideoBlock, {
        youtubeId: 'abc',
        poster: media(),
        blurhash: 'LRE39j%L4nWC_Noe9Fay%gM|D%s:',
      }),
    )
    const canvas = container.querySelector('canvas.video__cover-blur')
    expect(canvas).not.toBeNull()
    expect(canvas?.getAttribute('data-hash')).toBe('LRE39j%L4nWC_Noe9Fay%gM|D%s:')
  })

  it('renders an empty cover when no poster is set', () => {
    const { container } = render(createElement(VideoBlock, { youtubeId: 'abc' }))
    expect(container.querySelector('div.video__cover')).not.toBeNull()
    expect(container.querySelector('img.video__cover')).toBeNull()
  })

  it('renders nothing without a youtube id', () => {
    const { container } = render(createElement(VideoBlock, { youtubeId: '' }))
    expect(container.querySelector('.video')).toBeNull()
  })

  it('initialises the YouTube player and recedes the cover when ready', async () => {
    const player = makePlayer()
    const Player = vi.fn(function (
      _el: unknown,
      opts: { events?: { onReady?: (e: unknown) => void } },
    ) {
      opts?.events?.onReady?.({ target: player })
      return player
    })
    ;(window as unknown as { YT?: unknown }).YT = { Player, loaded: true }

    const { container } = render(createElement(VideoBlock, { youtubeId: 'xyz', poster: media() }))

    await waitFor(() => expect(Player).toHaveBeenCalled())
    expect(container.querySelector('.video__iframe')).not.toBeNull()
    await waitFor(() =>
      expect(container.querySelector('.video__cover--video-ready')).not.toBeNull(),
    )
    expect(player.setVolume).toHaveBeenCalledWith(10)
    expect(Player.mock.calls[0]?.[1]).toMatchObject({
      playerVars: { autoplay: 1, mute: 1 },
    })
  })

  it('mutes and plays the player when the scroll trigger enters', async () => {
    const player = makePlayer()
    const Player = vi.fn(function (
      _el: unknown,
      opts: { events?: { onReady?: (e: unknown) => void } },
    ) {
      opts?.events?.onReady?.({ target: player })
      return player
    })
    ;(window as unknown as { YT?: unknown }).YT = { Player, loaded: true }

    render(createElement(VideoBlock, { youtubeId: 'abc', poster: media() }))
    await waitFor(() => expect(Player).toHaveBeenCalled())

    const config = gsapMock.fromTo.mock.calls.at(-1)?.[2] as {
      scrollTrigger: { onEnter: () => void }
    }
    config.scrollTrigger.onEnter()

    expect(player.mute).toHaveBeenCalled()
    expect(player.playVideo).toHaveBeenCalled()
  })
})
