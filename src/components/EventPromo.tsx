import Image from 'next/image'

// WAC-TODO: this promo is WR's "Battle of the Paddles" event. Replace the
// assets/copy with a WAC promo, or remove the EventPromo path from Header.
interface EventPromoProps {
  title: string
}

const EventPromo = ({ title }: EventPromoProps) => {
  return (
    <div className="event-promo">
      <Image
        className="event-promo__prize-sticker"
        src="/images/logos/Battle-Of-The-Paddels-Prize-Sticker.webp"
        alt="Winning team receives a Helicopter Access rafting trip"
        width={286}
        height={173}
      />
      <Image
        className="event-promo__logo"
        src="/images/logos/Battle-Of-The-Paddles-Logo.webp"
        alt={title}
        width={311}
        height={317}
      />
    </div>
  )
}

export default EventPromo
