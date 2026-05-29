'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getAllCourses, getAllGallery, getAllAboutSections } from '@/lib/api'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ courses: 0, gallery: 0, about: 0 })

  useEffect(() => {
    Promise.allSettled([
      getAllCourses(),
      getAllGallery(),
      getAllAboutSections(),
    ]).then(([c, g, a]) => {
      setCounts({
        courses: c.status === 'fulfilled' ? c.value.data.length : 0,
        gallery: g.status === 'fulfilled' ? g.value.data.length : 0,
        about:   a.status === 'fulfilled' ? a.value.data.length : 0,
      })
    })
  }, [])

  const cards = [
    { label: 'Total Courses',    value: counts.courses, icon: '📚', href: '/admin/courses',   color: 'bg-forest-100 text-forest-700' },
    { label: 'Gallery Images',   value: counts.gallery, icon: '🖼️', href: '/admin/gallery',   color: 'bg-amber-100 text-amber-700' },
    { label: 'About Sections',   value: counts.about,   icon: '📄', href: '/admin/about',     color: 'bg-blue-100 text-blue-700' },
    { label: 'WhatsApp Enquiries', value: '→', icon: '💬', href: 'https://wa.me/918796309503', color: 'bg-green-100 text-green-700', external: true },
  ]

  const quickActions = [
    { label: 'Add New Course', icon: '➕', href: '/admin/courses' },
    { label: 'Upload Gallery Image', icon: '📸', href: '/admin/gallery' },
    { label: 'Edit About Page', icon: '✏️', href: '/admin/about' },
    { label: 'View Website', icon: '🌐', href: '/', external: true },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-gray-800">Welcome Back!</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your Hira National Academy website from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link
            key={card.label}
            href={card.href}
            target={card.external ? '_blank' : undefined}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-xl mb-3`}>
              {card.icon}
            </div>
            <div className="text-2xl font-heading font-bold text-gray-800">{card.value}</div>
            <div className="text-sm text-gray-500 mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(action => (
            <Link
              key={action.label}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-forest-400 hover:bg-forest-50 transition-colors text-center group"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-forest-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-semibold text-amber-800 mb-2">📌 Academy Info</h3>
        <div className="text-sm text-amber-700 space-y-1">
          <p>📍 121 new Gandhi Nagar, Nehru Nagar 3, Ghaziabad – 201001</p>
          <p>📱 WhatsApp / Phone: +91 8796309503</p>

        </div>
      </div>
    </div>
  )
}
