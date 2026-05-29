'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { verifyAdmin } from '@/lib/api'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/admin/courses',   icon: '📚', label: 'Courses' },
  { href: '/admin/gallery',   icon: '🖼️', label: 'Gallery' },
  { href: '/admin/about',     icon: '📄', label: 'About Sections' },
  
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [username, setUsername] = useState('')
  const [sideOpen, setSideOpen] = useState(false)

  useEffect(() => {
    if (pathname === '/admin') return
    const token = Cookies.get('hna_token')
    if (!token) { router.replace('/admin'); return }
    verifyAdmin()
      .then(res => setUsername(res.data.username))
      .catch(() => { Cookies.remove('hna_token'); router.replace('/admin') })
  }, [pathname])

  if (pathname === '/admin') return <>{children}</>

  const handleLogout = () => {
    Cookies.remove('hna_token')
    toast.success('Logged out')
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-forest-900 flex flex-col transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-forest-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="/logo.png"
                alt="HNA Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white font-heading font-bold text-sm">HNA Admin</div>
              <div className="text-gray-400 text-xs">{username}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSideOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-forest-600 text-white'
                  : 'text-gray-300 hover:bg-forest-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-forest-700 space-y-2">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white text-sm rounded-lg hover:bg-forest-800 transition-colors">
            🌐 View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 text-sm rounded-lg hover:bg-forest-800 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sideOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSideOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
          <button className="md:hidden text-gray-600" onClick={() => setSideOpen(true)}>
            ☰
          </button>
          <h1 className="font-heading font-semibold text-gray-800 text-lg capitalize">
            {navItems.find(n => n.href === pathname)?.label || 'Admin Panel'}
          </h1>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
