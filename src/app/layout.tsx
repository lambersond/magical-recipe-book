import { Geist, Geist_Mono as GeistMono } from 'next/font/google'
import Script from 'next/script'
import { SessionWrapper } from '@/components/session-wrapper'
import type { Metadata, Viewport } from 'next'
import './globals.css'

// This is too difficult to read -- look at other fonts
// const mailman = localFont({
//   src: './Mailman.woff2',
// })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "The Adventurer's Cookbook",
  description: 'For Adventurers who like to eat well while traveling',
  metadataBase: new URL('https://cookbook.illagria.com'),
  openGraph: {
    title: "The Adventurer's Cookbook",
    images: {
      url: '/logo.png',
      secureUrl: '/logo.png',
      alt: "The Adventurer's Cookbook Logo",
      type: 'image/png',
      width: 64,
      height: 64,
    },
  },
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <Script id='sleekplan-widget' strategy='afterInteractive'>
          {`
        window.$sleek=[];
        window.SLEEK_PRODUCT_ID=84812552;
        (function(){
        d=document;
        s=d.createElement("script");
        s.src="https://client.sleekplan.com/sdk/e.js";
        s.async=1;
        d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
        </Script>
      </head>
      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
