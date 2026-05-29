'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/lib/api'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    if (Cookies.get('hna_token')) router.replace('/admin/dashboard')
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginAdmin(username, password)
      Cookies.set('hna_token', res.data.token, { expires: 1 })
      toast.success('Welcome, ' + res.data.username)
      router.push('/admin/dashboard')
    } catch {
      toast.error('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-amber-400 rounded-full flex items-center justify-center text-forest-900 font-heading font-bold text-xl mb-4">
            HNA
          </div>
          <h1 className="font-heading text-white text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Hira National Academy</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="font-heading text-forest-800 text-xl font-semibold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-forest-400 rounded-xl text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-forest-400 rounded-xl text-sm outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-bold rounded-xl transition-colors mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            Default: hiraashram / @Hiraashram2010 (change after first login)
          </p>
        </div>
      </div>
    </div>
  )
}
