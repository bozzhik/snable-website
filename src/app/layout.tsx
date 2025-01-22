export {metadata} from '@/lib/layout-config'
import {geistMono, suisseIntl} from '@/lib/layout-config'
import '@/app/globals.css'

import {Analytics as VercelAnalytics} from '@vercel/analytics/react'

import YandexMetrika from '~/Global/Analytics'
import Header from '~/Global/Header'
import {Toaster} from '~/UI/Sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${suisseIntl.variable} ${geistMono.variable} bg-black text-white font-sans antialiased`}>
        <Header />
        {children}

        <Toaster richColors />
        {process.env.NODE_ENV === 'production' && (
          <>
            <YandexMetrika /> <VercelAnalytics />
          </>
        )}
      </body>
    </html>
  )
}
