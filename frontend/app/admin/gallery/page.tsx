'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getAllGallery, uploadImage, updateImage, deleteImage } from '@/lib/api'
import toast from 'react-hot-toast'

const CATEGORIES = ['academy', 'ashram', 'events', 'students', 'other']

interface GImg { id: number; title: string; cloudinary_url: string; category: string; is_active: boolean }

export default function AdminGalleryPage() {
  const [images, setImages]   = useState<GImg[]>([])
  const [uploading, setUploading] = useState(false)
  const [title, setTitle]     = useState('')
  const [category, setCategory] = useState('academy')
  const [filter, setFilter]   = useState('ALL')
  const fileRef               = useRef<HTMLInputElement>(null)

  const load = () => getAllGallery().then(r => setImages(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) { toast.error('Please select a file'); return }
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', title)
    fd.append('category', category)
    setUploading(true)
    try {
      await uploadImage(fd)
      toast.success('Image uploaded!')
      setTitle(''); setCategory('academy')
      if (fileRef.current) fileRef.current.value = ''
      load()
    } catch { toast.error('Upload failed. Check Cloudinary config.') }
    finally { setUploading(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return
    await deleteImage(id); toast.success('Deleted'); load()
  }

  const handleToggle = async (img: GImg) => {
    await updateImage(img.id, { is_active: !img.is_active })
    toast.success(img.is_active ? 'Hidden' : 'Visible'); load()
  }

  const filtered = filter === 'ALL' ? images : images.filter(i => i.category === filter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-800">Gallery Management</h2>
          <p className="text-gray-500 text-sm">{images.length} images uploaded to Cloudinary</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-semibold text-gray-800 mb-4">📸 Upload New Image</h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Image File *</label>
            <input ref={fileRef} type="file" accept="image/*" required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Title / Caption</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Yoga Class 2024" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none bg-white">
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <div className="md:col-span-3">
            <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors">
              {uploading ? 'Uploading to Cloudinary...' : '⬆️ Upload Image'}
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-400 mt-3">Images are stored on Cloudinary. Make sure CLOUDINARY_* environment variables are set.</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', ...CATEGORIES].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${filter === f ? 'bg-forest-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-forest-50'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🖼️</p>
          <p>No images yet. Upload some images above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(img => (
            <div key={img.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${!img.is_active ? 'opacity-50' : ''}`}>
              <div className="relative aspect-square bg-gray-100">
                <Image src={img.cloudinary_url} alt={img.title || ''} fill className="object-cover" />
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-700 font-medium truncate">{img.title || 'Untitled'}</p>
                <p className="text-xs text-gray-400 capitalize">{img.category}</p>
                <div className="flex gap-1 mt-2">
                  <button onClick={() => handleToggle(img)} className={`flex-1 py-1 rounded-lg text-xs font-medium transition-colors ${img.is_active ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {img.is_active ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleDelete(img.id)} className="flex-1 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors">
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
