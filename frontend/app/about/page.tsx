'use client'
import { useState, useEffect } from 'react'
import { getAboutSections } from '@/lib/api'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'

interface Section {
  id: number
  title: string
  content: string
  section_key: string
}

const defaultSections = [
  {
    id: 0,
    section_key: 'mission',
    title: 'Our Mission',
    content: 'Hira National Academy (HNA) is dedicated to spreading the scientific knowledge of nature cure and yoga therapy through quality education. We aim to promote Nature Cure & Yoga all over the world, upholding the Gandhian thought of better health for the last layer of society.',
  },
  {
    id: 1,
    section_key: 'history',
    title: 'Our History',
    content: 'Founded as an Ashram in 2010, HNA has been at the forefront of natural healing education in Ghaziabad. The Academy was formally registered in 2016 and has since been affiliated with both the Akhil Bharti Prakritik Chikitsa Parishad (ABPCP) and the Gandhi National Academy of Naturopathy (GNAP), offering a comprehensive range of recognized programmes.',
  },
  {
    id: 2,
    section_key: 'philosophy',
    title: 'Our Philosophy',
    content: 'We believe in the drugless, natural approach to healing. Our philosophy is rooted in the five natural elements – Earth, Water, Fire, Air and Ether – and how harmonizing with them restores health. Every course and treatment we offer is guided by this timeless wisdom.',
  },
]

const timeline = [
  { year: '2010', event: 'Ashram Founded', desc: 'Hira National Ashram established in Ghaziabad for nature cure and yoga.' },
  { year: '2016', event: 'Academy Registered', desc: 'Hira National Academy formally registered and affiliated with national bodies.' },
  { year: '2017', event: 'ABPCP Affiliation', desc: 'Official affiliation with Akhil Bharti Prakritik Chikitsa Parishad.' },
  { year: '2018', event: 'GNAP Partnership', desc: 'Partnership with Gandhi National Academy of Naturopathy for NDDY courses.' },
  { year: '2024', event: 'Growing Strong', desc: 'Hundreds of students trained. Expanding course offerings and digital reach.' },
]

export default function AboutPage() {
  const [sections, setSections] = useState<Section[]>(defaultSections as any)

  useEffect(() => {
    getAboutSections()
      .then(res => { if (res.data?.length > 0) setSections(res.data) })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero */}
      <div className="hero-gradient pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-leaf-pattern" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-amber-300 text-sm">🏛 Est. 2010 · Ghaziabad</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">About Hira National Academy</h1>
          <p className="text-gray-300 text-lg">Pioneering natural healing education in the heart of Uttar Pradesh</p>
        </div>
      </div>

      {/* Dynamic Sections */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div
                key={section.id}
                className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="bg-forest-800 rounded-2xl p-8 text-center h-full flex flex-col justify-center">
                    <div className="text-4xl mb-4">
                      {['🌱', '📜', '🕊️', '🍃', '✨'][i % 5]}
                    </div>
                    <h3 className="font-heading text-white font-bold text-xl">{section.title}</h3>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-8 border border-forest-100 shadow-sm">
                  <h2 className="font-heading text-forest-700 font-semibold text-2xl mb-4">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-forest-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader tag="Journey" title="Our Story Through the Years" />
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-forest-200 md:-translate-x-0.5" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-xl p-5 border border-forest-100 shadow-sm">
                      <h3 className="font-heading text-forest-700 font-semibold">{item.event}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-forest-600 border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white font-heading font-bold text-xs text-center leading-tight">{item.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 md:hidden">
                    <div className="bg-white rounded-xl p-4 border border-forest-100 shadow-sm">
                      <h3 className="font-heading text-forest-700 font-semibold">{item.event}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`hidden md:block md:w-1/2 ${i % 2 === 1 ? 'md:pr-12 text-right' : 'md:pl-12'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader tag="Affiliations" title="Recognised & Affiliated" subtitle="Our courses are affiliated with two major national bodies for naturopathy education in India." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                abbr: 'ABPCP',
                full: 'Akhil Bharti Prakritik Chikitsa Parishad',
                courses: ['C.E.N.Y. (6-Month Certificate)', 'C.N.Y.T. (1-Year Certificate)', 'DNYS (3.5-Year Diploma)'],
                icon: '🍃',
              },
              {
                abbr: 'GNAP',
                full: 'Gandhi National Academy of Naturopathy',
                courses: ['Chikitsa Sahayak Certificate', 'NDDY – Diploma in Naturopathy & Yoga (3 Years)'],
                icon: '🕊️',
              },
            ].map(a => (
              <div key={a.abbr} className="bg-forest-50 rounded-2xl p-8 text-left border border-forest-100 card-lift">
                <div className="text-4xl mb-3">{a.icon}</div>
                <div className="text-xs text-forest-500 font-bold tracking-widest uppercase mb-1">{a.abbr}</div>
                <h3 className="font-heading text-forest-800 font-bold text-xl mb-4">{a.full}</h3>
                <ul className="space-y-2">
                  {a.courses.map(c => (
                    <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-amber-500 mt-0.5">✓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-amber-50 border-t border-amber-200 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest-800 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6">Our team is ready to guide you about admissions, courses, and natural healing.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/918796309503?text=Hello%20HNA%21%20I%20want%20to%20know%20more%20about%20the%20academy."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
            >
              💬 WhatsApp Us
            </a>
            <Link href="/consulting" className="px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
