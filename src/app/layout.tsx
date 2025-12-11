import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Payload Demo',
  description: 'Demo project for exploring Payload CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
