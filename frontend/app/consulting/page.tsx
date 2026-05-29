'use client'
import { useState } from 'react'
import { getConsultWhatsAppLink, getAppointmentLink } from '@/lib/api'
import SectionHeader from '@/components/SectionHeader'

const concerns = [
  'Chronic disease management',
  'Diabetes & lifestyle diseases',
  'Digestive disorders',
  'Weight management',
  'Stress & mental wellness',
  'Joint & back pain',
  'Skin conditions',
  'General health improvement',
  'Yoga & meditation guidance',
  'Course admission inquiry',
  'Other',
]

const consultTypes = [
  {
    icon: '🏥',
    title: 'In-Person Consultation',
    desc: 'Visit our ashram for a detailed naturopathy assessment and personalized treatment plan.',
    action: 'Book Appointment',
    highlight: true,
  },
  {
    icon: '💬',
    title: 'WhatsApp Consultation',
    desc: 'Chat with our experts on WhatsApp for quick guidance and appointment booking.',
    action: 'Chat Now',
    highlight: false,
  },
  {
    icon: '📞',
    title: 'Phone Call',
    desc: 'Speak directly with our naturopathy advisors for any queries or concerns.',
    action: 'Call Us',
    highlight: false,
  },
]

export default function ConsultingPage() {
  const [name, setName]       = useState('')
  const [concern, setConcern] = useState('')
  const [custom, setCustom]   = useState('')
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 

  const handleWhatsApp = () => {
    const issue = concern === 'Other' ? custom : concern
    const link = getConsultWhatsAppLink(name, issue)
    window.open(link, '_blank')
  }

  const handleAppointment = () => {
    const link = getAppointmentLink()
    window.open(link, '_blank')
  }

  return (
    <>
      {/* Header */}
      <div className="hero-gradient pt-28 pb-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5 bg-leaf-pattern" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Book a Consultation
          </h1>
          <p className="text-gray-300 text-lg">
            Take the first step toward natural healing. Our naturopathy experts are here to guide you.
          </p>
        </div>
      </div>

      {/* Consultation types */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader tag="Connect With Us" title="How Would You Like to Consult?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {consultTypes.map((c, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 border card-lift ${
                  c.highlight
                    ? 'bg-forest-700 border-forest-500 text-white'
                    : 'bg-white border-forest-100'
                }`}
              >
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className={`font-heading font-semibold text-lg mb-2 ${c.highlight ? 'text-white' : 'text-forest-800'}`}>
                  {c.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${c.highlight ? 'text-gray-300' : 'text-gray-500'}`}>
                  {c.desc}
                </p>
                <a
                  href={
                    i === 0 ? `https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to book an in-person appointment at Hira National Academy.')}` :
                    i === 1 ? `https://wa.me/${WA}` :
                    `tel:+918796309503`
                  }
                  target={i < 2 ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`block text-center py-2.5 px-6 rounded-xl font-semibold text-sm transition-colors ${
                    c.highlight
                      ? 'bg-amber-400 hover:bg-amber-300 text-forest-900'
                      : 'bg-forest-100 hover:bg-forest-200 text-forest-700'
                  }`}
                >
                  {c.action}
                </a>
              </div>
            ))}
          </div>

          {/* WhatsApp Quick Connect Form */}
          <div className="bg-white rounded-3xl border border-forest-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-forest-700 to-forest-800 p-8 text-white">
              <h2 className="font-heading text-2xl font-bold mb-2">💬 Quick WhatsApp Connect</h2>
              <p className="text-gray-300 text-sm">Fill in your details and we'll open a pre-filled WhatsApp chat for you.</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-forest-800 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 border-2 border-forest-100 focus:border-forest-400 rounded-xl text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-forest-800 mb-2">Your Concern</label>
                  <select
                    value={concern}
                    onChange={e => setConcern(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-forest-100 focus:border-forest-400 rounded-xl text-sm outline-none transition-colors bg-white"
                  >
                    <option value="">Select a concern...</option>
                    {concerns.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {concern === 'Other' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-forest-800 mb-2">Please describe</label>
                    <textarea
                      value={custom}
                      onChange={e => setCustom(e.target.value)}
                      rows={3}
                      placeholder="Describe your concern..."
                      className="w-full px-4 py-3 border-2 border-forest-100 focus:border-forest-400 rounded-xl text-sm outline-none transition-colors resize-none"
                    />
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Connect via WhatsApp
                </button>
                <button
                  onClick={handleAppointment}
                  className="flex-1 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors"
                >
                  📅 Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address / Map */}
      <section className="py-14 bg-forest-50 border-t border-forest-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-heading text-forest-800 font-bold text-2xl mb-6">Visit Us</h2>
              <div className="space-y-5">
                {[
                  { icon: '📍', label: 'Address', value: '121 new Gandhi Nagar, Nehru Nagar 3, Ghaziabad – 201001, Uttar Pradesh' },
                  { icon: '📱', label: 'WhatsApp / Phone', value: '+91 8796309503' },
                  { icon: '🕐', label: 'Timings', value: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: 10:00 AM – 2:00 PM' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-forest-600 font-semibold uppercase tracking-wide">{item.label}</div>
                      <div className="text-gray-700 text-sm mt-0.5 whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="https://maps.google.com/?q=Nehru+Nagar+3+Ghaziabad+201001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors"
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>

            {/* Offline scholarship banner */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-heading text-amber-800 font-bold text-xl mb-3">
                Offline Admission Benefit
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed mb-5">
                Visit our academy in person and avail <strong>scholarship benefits</strong> based on your academic background and financial need. Our counselors will assess your eligibility and guide you.
              </p>
              <ul className="space-y-2 text-sm text-amber-700 mb-5">
                <li className="flex gap-2">✓ Scholarships for eligible students</li>
                <li className="flex gap-2">✓ Personalised counselling session</li>
                <li className="flex gap-2">✓ Same-day admission possible</li>
                <li className="flex gap-2 text-gray-500">✗ Online admissions at full fee (no scholarship)</li>
              </ul>
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to visit the academy for admission with scholarship.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-colors"
              >
                Ask About Scholarship
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
