import type {Metadata} from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: {
    template: '%s — Snable Extension',
    default: 'Snable Extension',
  },
  description: 'Chrome extension for web design analysis that lets you effortlessly extract colors, fonts, images, and animations while interacting with interface elements.',
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
