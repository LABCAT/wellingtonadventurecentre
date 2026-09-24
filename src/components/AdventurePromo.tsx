import Image from 'next/image'
import Link from 'next/link'
import { getImageAltText } from '@/lib/imageAltText'

interface TourItem {
  link: string
  heading: string
  text: string
}

interface AdventurePromoProps {
  style?: string
  heading?: string
  link?: string
  intro?: string
  hero_image?: string
  sidekick_image?: string
  tours?: TourItem[]
}

const AdventurePromo = ({
  style,
  heading,
  link,
  intro,
  hero_image,
  sidekick_image,
  tours = [],
}: AdventurePromoProps) => {
  return (
    <section className={'adventure-promo adventure-promo--' + style}>
      <div className="adventure-promo__inner container container--wide">
        <div className="adventure-promo__content-bg">
          <div className="adventure-promo__content">
            {link ? (
              <Link href={link} className="adventure-promo__link">
                <h2 className="adventure-promo__heading">{heading}</h2>
              </Link>
            ) : (
              <h2 className="adventure-promo__heading">{heading}</h2>
            )}
            <p className="adventure-promo__description">{intro}</p>

            <ul className="adventure-promo__tours">
              {tours.map((tour, i) => {
                const { link: tourLink, heading: tourHeading, text } = tour
                return (
                  <li key={i} className="adventure-promo__tour-item">
                    <Link href={tourLink} className="adventure-promo__link">
                      <h3 className="adventure-promo__link-title">
                        {tourHeading}
                        <svg
                          className="adventure-promo__link-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                        >
                          <path d="m12.75 35.95-2.1-2.1 9.9-9.9-9.9-9.9 2.1-2.1 12 12Zm12.65 0-2.1-2.1 9.9-9.9-9.9-9.9 2.1-2.1 12 12Z" />
                        </svg>
                      </h3>
                    </Link>
                    <p
                      className={`adventure-promo__description ${i === tours.length - 1 ? 'adventure-promo__description--last' : ''}`}
                    >
                      {text}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {hero_image && (
          <Image
            src={hero_image}
            alt={getImageAltText(hero_image)}
            width={900}
            height={600}
            className="adventure-promo__image"
          />
        )}
        {sidekick_image && (
          <Image
            src={sidekick_image}
            alt={getImageAltText(sidekick_image)}
            width={600}
            height={400}
            className="adventure-promo__image adventure-promo__image--small"
          />
        )}
      </div>
    </section>
  )
}

export default AdventurePromo
