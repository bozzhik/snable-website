import type {Metadata} from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: {
    template: '%s — Snable Chrome Extension',
    default: 'Snable Chrome Extension',
  },
  description: 'Chrome extension for visual data extraction from websites, helping you capture colors, fonts and images while exploring new designs for inspiration.',
  openGraph: {
    images: 'https://snable.website' + '/og.png',
  },
}

export const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const suisseIntl = localFont({
  variable: '--font-suisse-intl',
  src: [
    {
      path: '../assets/fonts/SuisseIntl-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/SuisseIntl-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/SuisseIntl-SemiBold.woff2',
      weight: '600',
    },
  ],
})
