'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

interface Vacancy {
  id: number
  title: string
  description: string
  location: string
  is_active: boolean
}

const emptyForm = { title: '', description: '', location: 'Ghaziabad', is_active: true }

export default function AdminVacancyPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = () => api.get('/api/vacancy/all').then(r => setVacancies(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) {
        await api.put(`/api/vacancy/${editId}`, form)
        toast.success('Vacancy updated')
      } else {
        await api.post('/api/vacancy/', form)
        toast.success('Vacancy added')
      }
      setForm(emptyForm); setEditId(null); setShowForm(false); load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleEdit = (v: Vacancy) => {
    setForm({ title: v.title, description: v.description, location: v.location, is_active: v.is_active })
    setEditId(v.id); setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this vacancy?')) return
    await api.delete(`/api/vacancy/${id}`)
    toast.success('Deleted'); load()
  }

  const handleToggle = async (v: Vacancy) => {
    await api.put(`/api/vacancy/${v.id}`, { is_active: !v.is_active })
    toast.success(v.is_active ? 'Hidden' : 'Visible'); load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-800">Job Vacancies</h2>
          <p className="text-gray-500 text-sm">Active vacancies show in the moving ticker at bottom of website</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }}
          className="px-5 py-2.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-xl text-sm">
          + Add Vacancy
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-heading font-semibold text-gray-800 mb-4">{editId ? 'Edit Vacancy' : 'Add New Vacancy'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Job Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none"
                placeholder="e.g. Naturopathy Teacher, Computer Instructor" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none"
                placeholder="e.g. Ghaziabad" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none resize-none"
                placeholder="Job details, requirements, contact info..." />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="v_active" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="w-4 h-4 accent-forest-600" />
              <label htmlFor="v_active" className="text-sm text-gray-700">Show in ticker (active)</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm">
                {saving ? 'Saving...' : editId ? 'Update' : 'Add Vacancy'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setForm(emptyForm) }}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {vacancies.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">💼</p>
            <p>No vacancies yet. Add one to show in the ticker!</p>
          </div>
        )}
        {vacancies.map(v => (
          <div key={v.id} className={`bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4 ${!v.is_active ? 'opacity-60 border-gray-200' : 'border-gray-100'}`}>
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-xl">💼</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800">{v.title}</div>
              <div className="text-gray-400 text-xs mt-0.5">📍 {v.location} · {v.is_active ? '✅ Showing in ticker' : '🔒 Hidden'}</div>
              {v.description && <p className="text-gray-600 text-xs mt-1 line-clamp-2">{v.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleToggle(v)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${v.is_active ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                {v.is_active ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => handleEdit(v)} className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-xs font-medium">Edit</button>
              <button onClick={() => handleDelete(v.id)} className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}