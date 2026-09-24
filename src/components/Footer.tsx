import Image from 'next/image'
import Logo from './Logo'
import { Facebook, Instagram, TripAdvisor } from './Icons/SocialIcons'

const Footer = () => {
  return (
    <footer className="site-footer" itemType="https://schema.org/WPFooter" itemScope>
      <div className="site-footer__contact">
        <div className="mask-pattern mask-pattern--top mask-pattern--brown"></div>
        <div className="site-footer__left">
          <Logo className="site-footer__logo" />
          <div className="site-footer__social">
            <a
              className="site-footer__link"
              target="_blank"
              href="https://www.facebook.com/people/Wellington-rafting/100063554893128/"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Welllington Rafting Facebook Page</span>
              {Facebook}
            </a>
            <a
              className="site-footer__link"
              target="_blank"
              href="https://www.instagram.com/wellingtonrafting/"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Welllington Rafting Instagram Page</span>
              {Instagram}
            </a>
            <a
              className="site-footer__link"
              target="_blank"
              href="https://www.tripadvisor.com/Attraction_Review-g2092409-d23026631-Reviews-Wellington_Rafting-Upper_Hutt_Greater_Wellington_North_Island.html"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Welllington Rafting Trip Advisor Profile</span>
              {TripAdvisor}
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__certs">
        <Image
          src="/images/logos/tripadvisor-travelers-choice-2022.webp"
          alt="Tripadvisor - Travelers' Choice 2022"
          width={112}
          height={140}
          sizes="(min-width: 992px) 112px, 56px"
          className="site-footer__cert-image"
        />
        <Image
          src="/images/logos/adventuremark-blue-new-zealand-adventure-safety-certification.webp"
          alt="Adventuremark Adventure Safety Certification"
          width={134}
          height={140}
          sizes="(min-width: 992px) 134px, 67px"
          className="site-footer__cert-image"
        />
        <Image
          src="/images/logos/qualmark-endorsement-bronze.webp"
          alt="Qualmark Endorsement Bronze"
          width={156}
          height={140}
          sizes="(min-width: 992px) 156px, 78px"
          className="site-footer__cert-image"
        />
      </div>

      <div className="site-footer__fine-print">
        <h2 className="site-footer__fine-print-heading">The Fine Print</h2>
        <div>
          <p>
            Experience wilderness white water rafting and more just 45 minutes from
            Wellington&apos;s city centre with{' '}
            <a href="https://www.wellingtonrafting.nz/" target="_blank" rel="noopener noreferrer">
              Wellington Rafting
            </a>
            . Tucked away in an untouched river valley, Wellington is an adventure playground that
            offers a thrilling escape into the wild landscapes of the Wellington and Wairarapa
            regions. Anticipation builds from the moment you arrive, with experienced guides leading
            the way through fast-flowing rapids and beautiful backcountry scenery. Wellington
            Rafting offers a wide range of adventures beyond rafting, including canyoning,
            abseiling, inflatable kayak river trips and multi-activity combo packages.
          </p>
          <p>
            At Wellington Rafting, we operate in a wide range of weather conditions and believe that
            a bit of rain can often add to the adventure. Our trips generally run rain or shine, and
            most weather conditions do not prevent us from delivering a safe and exciting
            experience. Trips will only be cancelled in the event of severe weather or unsafe river
            conditions where the safety of our guests and guides could be compromised. River levels
            can naturally fluctuate. If water levels are too low to safely operate our Grade 3
            Wilderness Rafting Tour, we will happily offer you an alternative adventure of equal
            value. Options may include:
          </p>
          <ul>
            <li>Little Akatarawa Canyoning</li>
            <li>Waiohine Raft &amp; Abseil</li>
            <li>Grade 2 Scenic Float</li>
          </ul>
          <p>
            If an alternative option has a different price point, any difference will be refunded or
            payable accordingly. <br />
            Our team will always do our best to ensure you still get out and enjoy an unforgettable
            outdoor experience with us.
          </p>
          <p>
            All adventure activities include some form of risk, Wellington Rafting does everything
            we can to keep our adventurers safe. When participating in our tours you will be
            required to sign a risk disclaimer form. For more information about the risks involved,
            see our{' '}
            <a href="https://www.wellingtonrafting.nz/about/risk-disclosure">risk disclosure</a>.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
