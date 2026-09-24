'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, About, Tours, Contact, GiftVoucher, Groups } from './Icons/MenuIcons'
import Logo from './Logo'

interface MenuItem {
  key: string
  link: string
  menuTitle: string
  hasChildren: boolean
  children: MenuItem[]
  isExternal?: boolean
}

const menuItems: MenuItem[] = [
  {
    key: 'home',
    link: '/',
    menuTitle: 'Home',
    hasChildren: false,
    children: [],
  },
  {
    key: 'about',
    link: '/about',
    menuTitle: 'About',
    hasChildren: false,
    children: [],
  },
  {
    key: 'tours',
    link: '/tours',
    menuTitle: 'Tours',
    hasChildren: true,
    children: [
      {
        key: 'white-water-rafting',
        link: '/tours/white-water-rafting',
        menuTitle: 'White Water Rafting',
        hasChildren: false,
        children: [],
      },
      {
        key: 'inflatable-kayaks-double-duckies',
        link: '/tours/inflatable-kayaks-double-duckie-river-trips',
        menuTitle: 'Inflatable Kayaks / \nDouble Duckie River Trips',
        hasChildren: false,
        children: [],
      },
      {
        key: 'helicopter-access-whitewater-rafting',
        link: '/tours/helicopter-access-white-water-rafting',
        menuTitle: 'Helicopter Access \nTotara Flats Rafting',
        hasChildren: false,
        children: [],
      },
      {
        key: 'akatarawa-forest-canyoning-trip',
        link: '/tours/akatarawa-forest-canyoning-trip',
        menuTitle: 'Little Akatarawa \nCanyoning Tour',
        hasChildren: false,
        children: [],
      },
      {
        key: 'combo-packages-work-functions-corporate-team-building',
        link: '/tours/combo-packages-work-functions-corporate-team-building',
        menuTitle: 'Combo Packages',
        hasChildren: false,
        children: [],
      },
    ],
  },
  {
    key: 'groups',
    link: '/promos',
    menuTitle: 'Groups',
    hasChildren: true,
    children: [
      {
        key: 'wellington-team-building',
        link: '/promos/wellington-team-building',
        menuTitle: 'Team Building',
        hasChildren: false,
        children: [],
      },
      {
        key: 'work-functions-wellington',
        link: '/promos/work-functions-wellington',
        menuTitle: 'Work Functions',
        hasChildren: false,
        children: [],
      },
      {
        key: 'hens-and-stag-parties-wellington',
        link: '/promos/hens-and-stag-parties-wellington',
        menuTitle: 'Hens and \nStag Parties',
        hasChildren: false,
        children: [],
      },
    ],
  },
  {
    key: 'contact',
    link: '/contact',
    menuTitle: 'Contact',
    hasChildren: false,
    children: [],
  },
  {
    key: 'gift-vouchers',
    link: 'https://fareharbor.com/embeds/book/wellingtonrafting/items/334308/?full-items=yes',
    menuTitle: 'Gift Vouchers',
    hasChildren: false,
    children: [],
    isExternal: true,
  },
]

const MainMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState('')
  const pathname = usePathname()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const toggleSubMenu = (subMenu: string) => setSubMenuOpen(subMenu)

  const isCurrentPage = (link: string) => {
    if (pathname?.includes('tours') && link === '/tours') return true
    if (pathname === link) return true
    return false
  }

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false)
    }
  }, [pathname])

  return (
    <>
      <button
        aria-label={`${menuOpen ? 'Close Menu' : 'Open Menu'}`}
        className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
        onClick={toggleMenu}
      >
        <svg className="menu-toggle__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0h24v24H0V0z" fill="none" />
          <path d="M3 18H16V16H3V18ZM3 13H13V11H3V13ZM3 6V8H16V6H3Z" />
          <path
            className="menu-toggle__arrow"
            d="M20.985 15.59L17.405 12L20.985 8.41L19.575 7L14.575 12L19.575 17L20.985 15.59Z"
          />
        </svg>
      </button>

      <nav className={`main-menu${menuOpen ? ' main-menu--open' : ''}`}>
        <div className="main-menu__bg"></div>
        <div className="main-menu__nav-items">
          <Logo className="main-menu__logo" />
          {menuItems.map((menuItem) => {
            const { key, link, menuTitle, hasChildren, children, isExternal } = menuItem
            return (
              <div className="main-menu__item" key={key}>
                {!hasChildren && !isExternal && (
                  <Link
                    href={link}
                    className={`main-menu__link${subMenuOpen ? ' main-menu__link--submenu-open' : ''}${isCurrentPage(link) ? ' main-menu__link--current' : ''}`}
                  >
                    {menuTitle === 'Home' && Home}
                    {menuTitle === 'About' && About}
                    {menuTitle === 'Contact' && Contact}
                    {menuTitle === 'Gift Vouchers' && GiftVoucher}
                    {menuTitle === 'Groups' && Groups}
                    {menuTitle}
                  </Link>
                )}
                {!hasChildren && isExternal && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={`main-menu__link${subMenuOpen ? ' main-menu__link--submenu-open' : ''}`}
                  >
                    {menuTitle === 'Gift Vouchers' && GiftVoucher}
                    {menuTitle}
                  </a>
                )}
                {hasChildren && (
                  <>
                    <button
                      aria-label="Open Tours Menu"
                      className={`submenu-toggle${subMenuOpen ? ' submenu-toggle--open' : ''}`}
                      onClick={() => toggleSubMenu(key)}
                    >
                      <span
                        className={`submenu-toggle__text  main-menu__link${isCurrentPage(link) ? ' main-menu__link--current' : ''}`}
                      >
                        {menuTitle === 'Tours' && Tours}
                        {menuTitle === 'Groups' && Groups}
                        {menuTitle}
                      </span>
                      <svg
                        className={`submenu-toggle__icon${isCurrentPage(link) ? ' submenu-toggle__icon--current' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                      >
                        <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
                      </svg>
                    </button>
                    <div
                      className={`main-menu__submenu${subMenuOpen === key ? ' main-menu__submenu--open' : ''}`}
                    >
                      <button
                        aria-label="Go back to Main Menu"
                        className="submenu-toggle submenu-toggle--close"
                        onClick={() => toggleSubMenu('')}
                      >
                        <svg
                          className="submenu-toggle__icon submenu-toggle__icon--close"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                        >
                          <path d="m24 31.3 2.1-2.1-3.7-3.7h9.1v-3h-9.1l3.7-3.7-2.1-2.1-7.3 7.3ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
                        </svg>
                      </button>
                      <div className="main-menu__submenu-items">
                        {children.map((child) => {
                          const { key: childKey, link: childLink, menuTitle: childTitle } = child
                          return (
                            <Link
                              href={childLink}
                              key={childKey}
                              className={`main-menu__link main-menu__link--sub${subMenuOpen ? ' main-menu__link--sub-visible' : ''}${isCurrentPage(childLink) ? ' main-menu__link--current' : ''}`}
                            >
                              {childTitle}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
          <a
            className={`main-menu__cta${subMenuOpen ? ' main-menu__cta--submenu-open' : ''}`}
            href="https://fareharbor.com/embeds/book/wellingtonrafting/?full-items=yes"
            target="_blank"
            rel="noreferrer"
          >
            Book Now
          </a>
        </div>
      </nav>
    </>
  )
}

export default MainMenu
