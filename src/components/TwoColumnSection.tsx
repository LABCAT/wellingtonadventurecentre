'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { PlayIcon } from './Icons/PlayIcon'


const TwoColumnSection = () => {
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      document.querySelectorAll('[data-play-button]').forEach((playButton) => {
        playButton.addEventListener('click', (e) => {
          const button = e.currentTarget as HTMLButtonElement
          const parent = button.parentNode as HTMLElement
          parent.classList.add('video--starting')
          const videoid = button.getAttribute('data-youtubeid')
          if (!videoid) return

          const onPlayerReady = (event: any) => {
            event.target.playVideo()
            parent.classList.add('video--playing')
          }

          const div = document.createElement('div')
          div.setAttribute('id', videoid)
          parent.appendChild(div)
          new window.YT.Player(videoid, {
            videoId: videoid,
            playerVars: { rel: 0 },
            events: { onReady: onPlayerReady },
          })
        })
      })
    }
  })

  return (
    <section className="two-col-section">
      <div className="mask-pattern mask-pattern--top"></div>
      <div className="container">
        <h2 className="two-col-section__heading">
          Wilderness Whitewater Rafting on Te Awa Kairangi (The Hutt River)
        </h2>
      </div>
      <div className="container two-col-section__grid">
        <div className="two-col-section__text">
          <p>
            Wellington Rafting is a commercial river operation based in Upper Hutt, Wellington. In
            Wellington we provide trips on Te Awa Kairangi (The Hutt River) from Kaitoke Regional
            Park and the Akatarawa/Hutt River Confluence. We also provide trips in the Wairarapa on
            the Waiohine River from the end of Waiohine Gorge Road and from Totara Flats in the
            Tararua Ranges via helicopter access.
          </p>
          <p>
            Come and experience the hidden gems of your local Wellington and Wairarapa rivers. Paddle
            down exciting white water while taking in the amazing, untouched native New Zealand
            scenery. You will be accompanied, along your journey, by our fun-loving and experienced
            river guides, who will keep you safe and entertained.
          </p>
          <p>
            <strong>
              This is a must-do experience for anyone looking for something new to do in
              Wellington&apos;s big backyard.
            </strong>
          </p>
        </div>
        <div className="two-col-section__media">
          <h3 className="two-col-section__heading two-col-section__heading--right">
            Watch our promo!
          </h3>
          <div className="video">
            <Image
              src="/images/video-covers/Wellington-Rafting-Promo-Video-Cover.webp"
              alt="Wellington Rafting Promo Video"
              width={590}
              height={332}
              className="video__cover"
            />
            <button className="video__trigger" data-youtubeid="p1s2UjdqHZ0" data-play-button>
              {PlayIcon}
            </button>
          </div>
        </div>
      </div>
      <div className="mask-pattern mask-pattern--bottom"></div>
    </section>
  )
}

export default TwoColumnSection
