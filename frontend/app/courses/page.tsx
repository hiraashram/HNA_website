'use client'
import { useState, useEffect } from 'react'
import { getCourses } from '@/lib/api'
import CourseCard from '@/components/CourseCard'
import SectionHeader from '@/components/SectionHeader'

const tabs = [
  { key: 'DNYS',    label: 'DNYS Courses',    icon: '🍃', desc: 'Akhil Bharti Prakritik Chikitsa Parishad' },
  { key: 'NDDY',     label: 'NDDY Courses',      icon: '🕊️', desc: 'Gandhi National Academy of Naturopathy' },
  { key: 'MSME',     label: 'MSME Courses',icon: '🏡', desc: 'MSME & Self Courses' },
  { key: 'COMPUTER', label: 'Computer Courses',  icon: '💻', desc: 'Skill Enhancement Programs' },
  { key: 'University', label: 'University Courses', desc: 'Affiliated University Courses' },
]

interface Course {
  id: number
  title: string
  short_name: string
  description: string
  eligibility: string
  duration: string
  fee: string
  affiliation: string
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('DNYS')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCourses(activeTab)
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [activeTab])

  const activeTabInfo = tabs.find(t => t.key === activeTab)

  return (
    <>
      {/* Header */}
      <div className="hero-gradient pt-28 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-leaf-pattern" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-300 text-sm">📚 Our Programmes</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Courses & Programmes
          </h1>
          <p className="text-gray-300 text-lg">
            Nationally recognised naturopathy and yoga education from government-affiliated institutions.
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-1 py-2 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-forest-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-forest-50 hover:text-forest-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-14 bg-cream min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section intro */}
          {activeTabInfo && (
            <div className="mb-10 p-6 bg-white rounded-2xl border border-forest-100 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{activeTabInfo.icon}</span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-forest-800">{activeTabInfo.label}</h2>
                  <p className="text-gray-500 text-sm mt-1">{activeTabInfo.desc}</p>
                  {(activeTabInfo.key === 'DNYS' || activeTabInfo.key === 'NDDY') && (
                    <p className="text-xs text-amber-600 mt-2 font-medium">
                      🎓 Scholarships available for offline admissions based on eligibility. Visit us to know more.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse" />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🌱</div>
              <p className="font-heading text-xl">No courses available yet.</p>
              <p className="text-sm mt-2">Please check back soon or contact us.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Note section */}
      <section className="py-12 bg-forest-50 border-t border-forest-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-7 border border-forest-200 shadow-sm">
            <h3 className="font-heading text-forest-800 font-semibold text-lg mb-4">📋 Important Notes</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-forest-500">•</span> Medium of instruction and examination: Hindi / English. Other regional languages may be allowed if possible.</li>
              <li className="flex gap-2"><span className="text-forest-500">•</span> Academic sessions start from 1st July and 1st January with annual examinations in June & December.</li>
              <li className="flex gap-2"><span className="text-forest-500">•</span> New enrolled trainees must adopt the six month six semester system including study material.</li>
              <li className="flex gap-2"><span className="text-forest-500">•</span> Offline admission students may be eligible for scholarship as per their academic & financial background.</li>
              <li className="flex gap-2"><span className="text-amber-500">•</span> Online admissions are at full fee. No scholarship is available for online students.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
