'use client'
import { useState, useEffect } from 'react'
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '@/lib/api'
import toast from 'react-hot-toast'

const AFFILIATIONS = [
  { value: 'DNYS',    label: '🍃 DNYS – Akhil Bharti Prakritik Chikitsa Parishad' },
  { value: 'NDDY',     label: '🕊️ NDDY – Gandhi National Academy of Naturopathy' },
  { value: 'MSME',     label: '🏡 MSME & Residential Programs' },
  { value: 'COMPUTER', label: '💻 Computer & Skill Enhancement' },
  { value: 'University', label: 'University Courses'}
]

const emptyForm = {
  title: '', short_name: '', description: '', eligibility: '',
  duration: '', fee: '', affiliation: 'DNYS', order_index: 0, is_active: true,
}

interface Course { id: number; title: string; short_name: string; description: string; eligibility: string; duration: string; fee: string; affiliation: string; is_active: boolean; order_index: number }

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [form, setForm]       = useState(emptyForm)
  const [editId, setEditId]   = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [filter, setFilter]   = useState('ALL')

  const load = () => getAllCourses().then(r => setCourses(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) { await updateCourse(editId, form); toast.success('Course updated') }
      else        { await createCourse(form);          toast.success('Course created') }
      setForm(emptyForm); setEditId(null); setShowForm(false); load()
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const handleEdit = (c: Course) => {
    setForm({ title: c.title, short_name: c.short_name, description: c.description, eligibility: c.eligibility, duration: c.duration, fee: c.fee, affiliation: c.affiliation, order_index: c.order_index, is_active: c.is_active })
    setEditId(c.id); setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this course?')) return
    await deleteCourse(id); toast.success('Deleted'); load()
  }

  const handleToggle = async (c: Course) => {
    await updateCourse(c.id, { is_active: !c.is_active })
    toast.success(c.is_active ? 'Hidden' : 'Visible'); load()
  }

  const filtered = filter === 'ALL' ? courses : courses.filter(c => c.affiliation === filter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-gray-800">Manage Courses</h2>
          <p className="text-gray-500 text-sm">{courses.length} total courses</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true) }} className="px-5 py-2.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-xl transition-colors text-sm">
          + Add Course
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'DNYS', 'NDDY', 'MSME', 'COMPUTER','University'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? 'bg-forest-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-forest-50'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-heading font-semibold text-gray-800 mb-4">{editId ? 'Edit Course' : 'Add New Course'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Course Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" placeholder="e.g. Diploma in Naturopathy & Yogic Science" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Short Name / Abbreviation</label>
              <input value={form.short_name} onChange={e => setForm({...form, short_name: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" placeholder="e.g. DNYS" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Affiliation *</label>
              <select value={form.affiliation} onChange={e => setForm({...form, affiliation: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none bg-white">
                {AFFILIATIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Duration</label>
              <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" placeholder="e.g. 3.5 Years" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Fee</label>
              <input value={form.fee} onChange={e => setForm({...form, fee: e.target.value})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" placeholder="e.g. ₹15,000/year or Contact Academy" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Display Order</label>
              <input type="number" value={form.order_index} onChange={e => setForm({...form, order_index: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none resize-none" placeholder="Course description..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Eligibility</label>
              <textarea value={form.eligibility} onChange={e => setForm({...form, eligibility: e.target.value})} rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-forest-400 outline-none resize-none" placeholder="Who can apply..." />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="active" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} className="w-4 h-4 accent-forest-600" />
              <label htmlFor="active" className="text-sm text-gray-700">Show on website (active)</label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-forest-600 hover:bg-forest-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors">
                {saving ? 'Saving...' : (editId ? 'Update Course' : 'Create Course')}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Course list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">📚</p>
            <p>No courses found. Click "Add Course" to get started.</p>
          </div>
        )}
        {filtered.map(course => (
          <div key={course.id} className={`bg-white rounded-xl border ${course.is_active ? 'border-gray-100' : 'border-gray-200 opacity-60'} shadow-sm p-4 flex items-start gap-4`}>
            <div className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${
              course.affiliation === 'DNYS'       ? 'bg-forest-100 text-forest-700' :
              course.affiliation === 'NDDY'       ? 'bg-amber-100 text-amber-700'  :
              course.affiliation === 'MSME'       ? 'bg-orange-100 text-orange-700'  :
              course.affiliation === 'COMPUTER'   ? 'bg-blue-100 text-blue-700' :
              course.affiliation === 'University' ? 'bg-purple-100 text-purple-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {course.affiliation}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 text-sm truncate">{course.title}</div>
              <div className="text-gray-400 text-xs mt-0.5">{course.short_name} · {course.duration} · {course.is_active ? '✅ Visible' : '🔒 Hidden'}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleToggle(course)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${course.is_active ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'} transition-colors`}>
                {course.is_active ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => handleEdit(course)} className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-xs font-medium transition-colors">Edit</button>
              <button onClick={() => handleDelete(course.id)} className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
