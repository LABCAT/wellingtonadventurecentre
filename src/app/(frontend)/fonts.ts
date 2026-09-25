import localFont from 'next/font/local'

export const openSans = localFont({
  src: [
    {
      path: '../../../public/fonts/open-sans-v29-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/open-sans-v29-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/open-sans-v29-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/open-sans-v29-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/open-sans-v29-latin-800.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-open-sans',
})

export const rokkitt = localFont({
  src: [
    {
      path: '../../../public/fonts/rokkitt-v29-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/rokkitt-v29-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/rokkitt-v29-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/rokkitt-v29-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/rokkitt-v29-latin-900.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-rokkitt',
})
