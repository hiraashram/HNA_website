import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

const stats = [
  { value: '2010', label: 'Ashram Founded' },
  { value: '2016', label: 'Academy Registered' },
  { value: '2',    label: 'National Affiliations' },
  { value: '100%', label: 'Drug-Free Healing' },
]

const features = [
  { icon: '🌿', title: 'Natural Healing',   desc: 'Treat ailments through nature – sunlight, air, water, earth and fasting – without any drugs or chemicals.' },
  { icon: '🧘', title: 'Yoga & Pranayama',  desc: 'Ancient yogic practices integrated with modern naturopathy for holistic wellness of body, mind and soul.' },
  { icon: '📜', title: 'Certified Courses', desc: 'Government-recognised diplomas and certificates affiliated with DNYS, University and NDDY.' },
  { icon: '🏡', title: 'Ashram Living',     desc: 'Experience authentic nature-cure lifestyle in our residential ashram with organic food and serene surroundings.' },
]

const courseHighlights = [
  { name: 'C.E.N.Y.', full: 'Certificate in Elementary Naturopathy & Yoga', duration: '6 Months',  affil: 'ABPCP' },
  { name: 'C.N.Y.T.', full: 'Certificate in Naturopathy & Yoga Technique',   duration: '1 Year',    affil: 'ABPCP' },
  { name: 'DNYS',     full: 'Diploma in Naturopathy & Yogic Science',         duration: '3.5 Years', affil: 'ABPCP' },
  { name: 'NDDY',     full: 'Diploma in Naturopathy and Yoga',                duration: '3 Years',   affil: 'GNAP'  },
]

export default function HomePage() {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919540953175'

  return (
    <>
      {/* ══════════════ HERO ══════════════ */}
      <section className="hero-gradient" style={{ paddingTop: '90px', paddingBottom: '50px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

          {/* ── Mobile photo (shown ONLY on mobile, above text) ── */}
          <div className="lg:hidden" style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ width: '130px', height: '180px', borderRadius: '16px', overflow: 'hidden', border: '4px solid rgba(212,163,58,0.7)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <img src="/owner.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#d4963a', color: '#1e3a0d', fontSize: '11px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                🌿 Founder & Director
              </div>
            </div>
          </div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px', alignItems: 'center' }}>

            {/* Left — Text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(212,150,58,0.2)', border: '1px solid rgba(212,150,58,0.3)', borderRadius: '999px', padding: '6px 16px', marginBottom: '20px' }}>
                <span style={{ color: '#fcd34d', fontSize: '14px' }}>Est. 2010 · Ghaziabad, U.P.</span>
              </div>

              <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 'bold', color: 'white', lineHeight: '1.1', marginBottom: '20px' }}>
                Heal Naturally.<br />
                <span style={{ color: '#f59e0b' }}>Live Fully.</span>
              </h1>

              <p style={{ color: '#d1d5db', fontSize: '18px', lineHeight: '1.7', marginBottom: '28px', maxWidth: '480px' }}>
                Hira Ashram offers nationally-recognised Naturopathy & Yoga education,
                rooted in Gandhian philosophy of natural living and drug-free healing.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link href="/courses" style={{ padding: '14px 28px', backgroundColor: '#f59e0b', color: '#1e3a0d', fontWeight: 'bold', borderRadius: '12px', textDecoration: 'none', fontSize: '16px' }}>
                  Explore Courses
                </Link>
                <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to know about HNA courses.')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '14px 28px', border: '2px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: '600', borderRadius: '12px', textDecoration: 'none', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '20px', height: '20px', color: '#4ade80' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right — Desktop card (hidden on mobile) */}
            <div className="hidden lg:block">
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(74,130,34,0.3)', filter: 'blur(40px)', borderRadius: '24px' }} />
                <div style={{ position: 'relative', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '32px', textAlign: 'center' }}>
                  {/* Owner Photo */}
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                    <div style={{ width: '224px', height: '288px', borderRadius: '16px', overflow: 'hidden', border: '4px solid rgba(212,163,58,0.6)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                      <img src="/owner.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#d4963a', color: '#1e3a0d', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                      🌿 Founder & Director
                    </div>
                  </div>
                  {/* Logo + Name */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', marginBottom: '20px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src="/logo.png" alt="HNA" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div className="font-heading" style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>Hira National Academy</div>
                      <div style={{ color: '#9ca3af', fontSize: '12px' }}>Naturopathy & Yoga</div>
                    </div>
                  </div>
                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {stats.map(s => (
                      <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                        <div className="font-heading" style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '22px' }}>{s.value}</div>
                        <div style={{ color: '#d1d5db', fontSize: '11px', marginTop: '4px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '14px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <p style={{ color: '#e5e7eb', fontSize: '11px' }}>🏛 Affiliated with ABPCP & Gandhi National Academy of Naturopathy</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Our Approach" title="Why Choose Natural Healing?" subtitle="At HNA, we believe the body has the innate power to heal itself when given the right conditions." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-forest-100 card-lift text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-heading text-forest-800 font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ COURSES ══════════════ */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Courses" title="Start Your Healing Journey" subtitle="Nationally recognised courses designed for aspiring naturopaths, yoga practitioners and wellness seekers." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {courseHighlights.map((c, i) => (
              <Link key={i} href="/courses" className="bg-white rounded-2xl p-8 border border-forest-100 card-lift group">
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 ${c.affil === 'ABPCP' ? 'bg-forest-100 text-forest-700' : 'bg-amber-100 text-amber-700'}`}>
                  {c.affil}
                </div>
                <div className="font-heading font-bold text-forest-700 text-3xl mb-1 group-hover:text-forest-500 transition-colors">{c.name}</div>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">{c.full}</p>
                <div className="flex items-center gap-1.5 text-amber-600 text-base font-medium">⏱ {c.duration}</div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors">
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ SCHOLARSHIP ══════════════ */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-3xl mb-4">🎓</div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest-800 mb-3">Offline Admission Scholarship</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Visit our academy in person and avail <strong>scholarship benefits</strong> as per your eligibility!
            Offline admissions qualify for special fee concessions based on academic background and financial need.
            <span className="text-gray-500 text-sm mt-2 block">* Online admissions are at full fee. No scholarship available online.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to visit the academy and know about scholarship eligibility.')}`}
              target="_blank" rel="noopener noreferrer"
              className="px-7 py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors">
              Ask About Scholarship
            </a>
            <Link href="/consulting" className="px-7 py-3 border-2 border-forest-600 text-forest-700 hover:bg-forest-50 font-bold rounded-xl transition-colors">
              Visit Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ AFFILIATIONS ══════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader tag="Recognition" title="Our Affiliations" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Akhil Bharti Prakritik Chikitsa Parishad', abbr: 'ABPCP', desc: 'National body for Naturopathy education offering C.E.N.Y., C.N.Y.T. and DNYS programmes.', icon: '🍃' },
              { name: 'Gandhi National Academy of Naturopathy',    abbr: 'GNAP',  desc: 'Academy inspired by Gandhian principles of nature cure, offering Chikitsa Sahayak and NDDY programmes.', icon: '🕊️' },
            ].map(a => (
              <div key={a.abbr} className="bg-forest-50 rounded-2xl p-8 border border-forest-100 text-left card-lift">
                <div className="text-4xl mb-4">{a.icon}</div>
                <div className="text-xs font-bold text-forest-500 tracking-widest uppercase mb-2">{a.abbr}</div>
                <h3 className="font-heading text-forest-800 font-semibold text-xl mb-2">{a.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Begin Your Natural Healing Journey Today</h2>
          <p className="text-gray-300 text-lg mb-8">Connect with us on WhatsApp to learn about admissions, schedule a visit, or book a consultation.</p>
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to enquire about Hira National Academy.')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-2xl transition-colors shadow-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}