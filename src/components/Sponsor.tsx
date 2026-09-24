import { Facebook, Instagram, WebsiteLink } from './Icons/SocialIcons'
import { getImageAltText } from '@/lib/imageAltText'

interface InstagramInfo {
  handle?: string
  url?: string
}

interface SponsorData {
  name?: string
  logo?: string
  website?: string
  facebook?: string
  instagram?: InstagramInfo
  details?: string
}

interface SponsorProps {
  sponsor: SponsorData
}

const splitLink = (link: string) => {
  const result = link.replace(/https:\/\//g, '')
  return result.replace('/', '')
}

const Sponsor = ({ sponsor }: SponsorProps) => {
  const { name, logo, website, facebook, instagram, details } = sponsor

  return (
    <div className="sponsor">
      <div className="sponsor__logo-holder">
        {logo && <img src={logo} alt={getImageAltText(logo)} />}
      </div>
      <h3 className="sponsor__heading">{name}</h3>
      <p className="sponsor__details">{details}</p>
      {website && (
        <a href={website} target="_blank" className="sponsor__website" rel="noreferrer">
          <div className="sponsor__website-icon">{WebsiteLink}</div>
          <span
            className="sponsor__website-address"
            dangerouslySetInnerHTML={{ __html: splitLink(website) }}
          />
        </a>
      )}
      <div className="sponsor__social-links">
        {facebook && (
          <a
            href={facebook}
            target="_blank"
            className="sponsor__website sponsor__website--social"
            rel="noreferrer"
          >
            <div className="sponsor__website-icon">{Facebook}</div>
          </a>
        )}
        {instagram?.handle && (
          <a
            href={instagram.url}
            target="_blank"
            className="sponsor__website sponsor__website--social"
            rel="noreferrer"
          >
            <div className="sponsor__website-icon">{Instagram}</div>
            {instagram.handle}
          </a>
        )}
      </div>
    </div>
  )
}

export default Sponsor
