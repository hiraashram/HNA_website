'use client'
import { useState, useEffect } from 'react'
import { getAllAboutSections, createAboutSection, updateAboutSection, deleteAboutSection } from '@/lib/api'
import toast from 'react-hot-toast'

interface Section { id: number; section_key: string; title: string; content: string; is_active: boolean; order_index: number }

const emptyForm = { section_key: '', title: '', content: '', order_index: 0, is_active: true }

export default function AdminAboutPage() {
  const [sections, setSections] = useState<Section[]>([])
  const [form, setForm]         = useState(emptyForm)
  const [editId, setEditId]     = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)

  const load = () => getAllAboutSections().then(r => setSections(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) { await updateAboutSection(editId, form); toast.success('Section updated') }
      else        { await createAboutSection(form);         toast.success('Section created') }
      setForm(emptyForm); setEditId(null); setShowForm(false); load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleEdit = (s: Section) => {
    setForm({ section_key: s.section_key, title: s.title, content: s.content, order_index: s.order_index, is_active: s.is_active })
    setEditId(s.id); setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this section?')) return
    await deleteAboutSection(id); toast.success('Deleted'); load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-800">About Page Sections</h2>
          <p className="text-gray-500 text-sm">Manage the dynamic content shown on the About page</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }} className="px-5 py-2.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-xl transition-colors text-sm">
          + Add Section
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-heading font-semibold text-gray-800 mb-4">{editId ? 'Edit Section' : 'New Section'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Section Key (unique identifier)</label>
                <input required value={form.section_key} onChange={e => setForm({...form, section_key: e.target.value.toLowerCase().replace(/\s+/g, '_')})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" placeholder="e.g. mission, history, philosophy" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Display Order</label>
                <input type="number" value={form.order_index} onChange={e => setForm({...form, order_index: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Section Title *</label>
                <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" placeholder="e.g. Our Mission" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Content *</label>
                <textarea required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={5} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none resize-none" placeholder="Section content..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sec_active" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="w-4 h-4 accent-forest-600" />
                <label htmlFor="sec_active" className="text-sm text-gray-700">Show on website</label>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors">
                {saving ? 'Saving...' : (editId ? 'Update' : 'Create Section')}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm) }} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {sections.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">📄</p>
            <p>No sections yet. Add some to populate the About page.</p>
          </div>
        )}
        {sections.map(s => (
          <div key={s.id} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 ${!s.is_active ? 'opacity-60' : ''}`}>
            <div className="w-8 h-8 bg-forest-100 rounded-lg flex items-center justify-center text-xs font-bold text-forest-700 flex-shrink-0">
              #{s.order_index}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 text-sm">{s.title}</div>
              <div className="text-gray-400 text-xs mt-0.5 truncate">{s.section_key} · {s.is_active ? '✅ Visible' : '🔒 Hidden'}</div>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">{s.content}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(s)} className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-xs font-medium transition-colors">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
