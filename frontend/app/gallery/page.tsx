'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getGallery } from '@/lib/api'
import SectionHeader from '@/components/SectionHeader'

const categories = [
  { key: '',         label: 'All',       icon: '🖼️' },
  { key: 'academy',  label: 'Academy',   icon: '🏫' },
  { key: 'ashram',   label: 'Ashram',    icon: '🏡' },
  { key: 'events',   label: 'Events',    icon: '🎉' },
  { key: 'students', label: 'Students',  icon: '👨‍🎓' },
]

interface GalleryImage {
  id: number
  title: string
  cloudinary_url: string
  category: string
}

const placeholderImages = [
  { id: 1, title: 'Academy Main Building', cloudinary_url: '', category: 'academy' },
  { id: 2, title: 'Yoga Hall', cloudinary_url: '', category: 'ashram' },
  { id: 3, title: 'Graduation Ceremony', cloudinary_url: '', category: 'events' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('')
  const [images, setImages]     = useState<GalleryImage[]>([])
  const [loading, setLoading]   = useState(true)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  useEffect(() => {
    setLoading(true)
    getGallery(activeCategory || undefined)
      .then(res => setImages(res.data))
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [activeCategory])

  return (
    <>
      {/* Header */}
      <div className="hero-gradient pt-28 pb-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5 bg-leaf-pattern" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-gray-300 text-lg">A glimpse into life at HNA – academy, ashram, events and more.</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-forest-600 text-white'
                    : 'text-gray-600 hover:bg-forest-50 hover:text-forest-700'
                }`}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12 bg-cream min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📷</div>
              <p className="font-heading text-xl text-gray-400">No images yet in this category.</p>
              <p className="text-sm text-gray-400 mt-2">The admin will upload photos soon. Check back later!</p>
            </div>
          ) : (
            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
              {images.map(img => (
                <button
                  key={img.id}
                  className="break-inside-avoid w-full overflow-hidden rounded-2xl relative group cursor-zoom-in"
                  onClick={() => setLightbox(img)}
                >
                  <div className="relative w-full bg-forest-100 min-h-[150px]">
                    <Image
                      src={img.cloudinary_url}
                      alt={img.title || 'Gallery image'}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/40 rounded-2xl transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                      <span className="text-white text-sm font-medium truncate">{img.title}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <Image
              src={lightbox.cloudinary_url}
              alt={lightbox.title || ''}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            {lightbox.title && (
              <p className="text-center text-gray-300 mt-4 font-body">{lightbox.title}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
