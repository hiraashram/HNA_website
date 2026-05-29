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
  openGraph: {
    title: 'Hira Nisargopchar Ashram | Naturopathy & Yoga',
    description: 'Learn natural healing. Live naturally.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
