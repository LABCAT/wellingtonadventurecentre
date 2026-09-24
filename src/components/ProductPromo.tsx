import Image from 'next/image'
import { getImageAltText } from '@/lib/imageAltText'

interface ProductPromoProps {
  promoImage?: string
}

const ProductPromo = ({ promoImage }: ProductPromoProps) => {
  if (!promoImage) {
    return <></>
  }

  return (
    <section className="product-promo">
      <h2 className="product-promo__heading">
        <span className="product-promo__heading-text">GIVE THE GIFT</span>
        <span className="product-promo__heading-text product-promo__heading-text--highlight">
          OF ADVENTURE
        </span>
      </h2>

      <div className="product-promo__container">
        <div className="product-promo__overlay"></div>
        <p className="product-promo__tagline">
          Surprise Your Friends or Family with a Gift Voucher! Starting from just $130.
        </p>
        <Image
          src={promoImage}
          alt={getImageAltText(promoImage)}
          width={1280}
          height={636}
          className="product-promo__image"
        />
        <a
          href="https://fareharbor.com/embeds/book/wellingtonrafting/items/334308/?full-items=yes"
          target="_blank"
          rel="noreferrer"
          className="product-promo__cta button"
        >
          Buy Now !
        </a>
      </div>
    </section>
  )
}

export default ProductPromo
