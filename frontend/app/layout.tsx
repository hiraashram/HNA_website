import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Hira Nisargopchar Ashram | Naturopathy & Yoga',
  description: 'Hira National Academy (HNA) – Pioneering Naturopathy & Yoga education in Ghaziabad. Affiliated with ABPCP & Gandhi National Academy of Naturopathy.',
  keywords: 'naturopathy, yoga, diploma, certificate, HNA, Ghaziabad, nature cure, DNYS, NDDY',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: 'kgE2LGSTGtgHM2xgFjkucXlTnpSEem9tjXqQjdIRtGA',
  },
  openGraph: {
    title: 'Hira Nisargopchar Ashram | Naturopathy & Yoga',
    description: 'Learn natural healing. Live naturally.',
    type: 'website',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-cream font-body">
        <Toaster position="top-center" />
        <Navbar />
        <main>{children}</main>
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  )
}

