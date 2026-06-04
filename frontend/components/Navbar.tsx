'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navLinks = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/courses',    label: 'Courses' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/consulting', label: 'Consult' },
  { href: '/admission', label: 'Admission' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname              = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-forest-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden">
              <img
                src="/logo.png"
                alt="HNA Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white font-heading font-bold text-base md:text-lg leading-tight">
                Hira Nisargopchar Ashram
              </div>
              <div className="text-amber-300 text-xs font-body tracking-widest uppercase">
                Naturopathy & Yoga
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-forest-600 text-white'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consulting"
              className="ml-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-forest-900 font-body font-bold rounded-lg text-sm transition-colors"
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-forest-900/98 backdrop-blur-md border-t border-forest-700">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-body ${
                  pathname === link.href
                    ? 'bg-forest-600 text-white'
                    : 'text-gray-200 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consulting"
              onClick={() => setOpen(false)}
              className="block mt-2 px-4 py-3 bg-amber-500 text-forest-900 font-bold rounded-lg text-sm text-center"
            >
              📅 Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
