import { Geist, Geist_Mono as GeistMono } from 'next/font/google'
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
      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
