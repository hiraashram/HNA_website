'use client'
import { getCourseWhatsAppLink } from '@/lib/api'

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

interface CourseCardProps {
  course: Course
  accentColor?: string
}

const affiliationColors: Record<string, string> = {
  ABPCP:    'bg-forest-100 text-forest-800 border-forest-300',
  GNAP:     'bg-amber-50 text-amber-800 border-amber-300',
  MESS:     'bg-earth-100 text-earth-800 border-earth-300',
  COMPUTER: 'bg-blue-50 text-blue-800 border-blue-300',
}

const affiliationLabel: Record<string, string> = {
  DNYS:    'DNYS Affiliated',
  NDDY:     'NDDY Affiliated',
  MSME:     'Residential',
  COMPUTER: 'Skill Enhancement',
}

export default function CourseCard({ course }: CourseCardProps) {
  const waLink = getCourseWhatsAppLink(course.title)
  const badgeCls = affiliationColors[course.affiliation] || 'bg-gray-100 text-gray-700'
  const badgeLabel = affiliationLabel[course.affiliation] || course.affiliation

  return (
    <div className="bg-white rounded-2xl border border-forest-100 shadow-sm card-lift overflow-hidden flex flex-col h-full">
      {/* Color bar */}
      <div className={`h-1.5 w-full ${
        course.affiliation === 'DNYS'    ? 'bg-forest-500'  :
        course.affiliation === 'NDDY'     ? 'bg-amber-500'   :
        course.affiliation === 'MSME'     ? 'bg-earth-500'   :
        'bg-blue-500'
      }`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeCls}`}>
            {badgeLabel}
          </span>
          {course.short_name && (
            <span className="text-xs text-gray-400 font-mono">{course.short_name}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-forest-800 text-lg font-semibold leading-snug mb-3">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-4">
          {course.description}
        </p>

        {/* Meta */}
        <div className="space-y-2 mb-5">
          <div className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 flex-shrink-0">⏱</span>
            <span className="text-gray-600"><span className="font-medium text-gray-800">Duration:</span> {course.duration}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-forest-500 mt-0.5 flex-shrink-0">✓</span>
            <span className="text-gray-600 line-clamp-3">
              <span className="font-medium text-gray-800">Eligibility:</span> {course.eligibility}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-auto">
          <a
           href={`/admission?course=${encodeURIComponent(course.title)}`}
            className="flex-1 py-2.5 bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold rounded-xl text-center transition-colors"
          >
            Enroll Now
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918796309503'}?text=${encodeURIComponent('I want to know more about ' + course.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ask
          </a>
        </div>
      </div>
    </div>
  )
}
