import Sponsor from './Sponsor'

const sponsors = [
    {
        name: 'Mana Communications',
        logo: '/images/event-sponsors/Mana-Communications-Logo.webp',
        website: 'https://manacommunications.com/',
        facebook: 'https://www.facebook.com/manacommunications',
        instagram: {
            handle: '',
            url: ''
        },
        details: 'Wrote an article about us, made us many connections, endless promotions'
    },
    {
        name: 'Wild Kiwi Distilleries',
        logo: '/images/event-sponsors/Wildkiwi-Distillery-Logo.webp',
        website: 'https://wildkiwidistillery.com/',
        facebook: 'https://www.facebook.com/wildkiwibrewtown',
        instagram: {
            handle: '@wildkiwidistillery100',
            url: 'https://www.instagram.com/wildkiwidistillery100/'
        },
        details: 'Wild Kiwi has donated vouchers that will be given as prizes!'
    },
    {
        name: 'Wildfinder',
        logo: '/images/event-sponsors/Wildfinder-Logo.webp',
        website: 'https://wildfinder.co.nz/',
        facebook: 'https://www.facebook.com/WildfinderNZ',
        instagram: {
            handle: '@wildfinder_nz',
            url: 'https://www.instagram.com/wildfinder_nz/'
        },
        details: 'Donated a Rimutaka Cycle Trail tour and promoted us'
    },
    {
        name: 'Dive Wellington',
        logo: '/images/event-sponsors/Dive-Wellington-Logo.webp',
        website: 'https://divewellington.co.nz/',
        facebook: 'https://www.facebook.com/DiveWellington',
        instagram: {
            handle: '@divewellington',
            url: 'https://www.instagram.com/divewellington/'
        },
        details: 'Donated 2 learn to dive vouchers valued at $1500'
    },
    {
        name: 'Amalgamated Helicopters',
        logo: '/images/event-sponsors/Amalgamated-Helicopters-Banner.webp',
        website: 'https://amalgamatedheli.co.nz/',
        facebook: 'https://www.facebook.com/AmalgamatedHeli',
        instagram: {
            handle: '@ahnzlheli',
            url: 'https://www.instagram.com/ahnzlheli/'
        },
        details: 'Donated Helicopter Access Rafting trip'
    },
    {
        name: 'Upper Hutt City Council',
        logo: '/images/event-sponsors/Upper-Hutt-City-Council-Logo.webp',
        website: 'https://upperhuttcity.com/',
        facebook: 'https://www.facebook.com/UpperHuttCityCouncil',
        instagram: {
            handle: '@upperhuttcity',
            url: 'https://www.instagram.com/upperhuttcity/'
        },
        details: 'Promoted us and helped us with advertisements'
    }
];

const EventSponsors = () => {
  return (
    <section className="event-sponsors">
      <h2 className="event-sponsors__heading">
        Lets give a special thanks
        <br />
        to the sponsors
        <br /> for 2023!
      </h2>
      <div className="event-sponsors__layout">
        {sponsors.map((sponsor, i) => (
          <Sponsor sponsor={sponsor} key={i} />
        ))}
      </div>
    </section>
  )
}

export default EventSponsors
