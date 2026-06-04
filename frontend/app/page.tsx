import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

const stats = [
  { value: '2010', label: 'Ashram Founded' },
  { value: '2016', label: 'Academy Registered' },
  { value: '2', label: 'National Affiliations' },
  { value: '100%', label: 'Drug-Free Healing' },
]

const features = [
  {
    icon: '🌿',
    title: 'Natural Healing',
    desc: 'Treat ailments through nature – sunlight, air, water, earth and fasting – without any drugs or chemicals.',
  },
  {
    icon: '🧘',
    title: 'Yoga & Pranayama',
    desc: 'Ancient yogic practices integrated with modern naturopathy for holistic wellness of body, mind and soul.',
  },
  {
    icon: '📜',
    title: 'Certified Courses',
    desc: 'Government-recognised diplomas and certificates affiliated with DNYS , Universitys and NDDY.',
  },
  {
    icon: '🏡',
    title: 'Ashram Living',
    desc: 'Experience authentic nature-cure lifestyle in our residential ashram with organic food and serene surroundings.',
  },
]

const courseHighlights = [
  { name: 'C.E.N.Y.', full: 'Certificate in Elementary Naturopathy & Yoga', duration: '6 Months', affil: 'ABPCP' },
  { name: 'C.N.Y.T.', full: 'Certificate in Naturopathy & Yoga Technique',   duration: '1 Year',   affil: 'ABPCP' },
  { name: 'DNYS',     full: 'Diploma in Naturopathy & Yogic Science',          duration: '3.5 Years', affil: 'ABPCP' },
  { name: 'NDDY',     full: 'Diploma in Naturopathy and Yoga',                 duration: '3 Years',  affil: 'GNAP'  },
]

export default function HomePage() {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative hero-gradient flex items-center overflow-hidden pt-20 pb-10">
        {/* Background organic shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-forest-600/20 blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" style={{ animationDelay: '2s' }} />
          {/* Leaf pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("https://thumbs.dreamstime.com/b/green-grass-sunset-views-blurred-background-41123029.jpg")`,
          }} />

        </div>

       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          
            {/* Text */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                
                <span className="text-amber-300 text-sm font-medium">Est. 2010 · Ghaziabad, U.P.</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Heal Naturally.<br />
                <span className="text-amber-400">Live Fully.</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Hira Ashram offers nationally-recognised Naturopathy & Yoga education,
                rooted in Gandhian philosophy of natural living and drug-free healing.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-forest-900 font-bold rounded-xl transition-colors text-base"
                >
                  Explore Courses
                </Link>
                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to know about Hira National Academy courses.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl transition-colors text-base flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Hero Card */}
            <div className="mt-8 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-forest-500/30 blur-2xl rounded-3xl" />
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-3 sm:p-5 lg:p-8 max-w-sm mx-auto lg:max-w-none">
                  <div className="text-center mb-6">
                   {/* Owner Photo */}
                  <div className="relative inline-block mb-4">
                  <div className="w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-60 lg:w-56 lg:h-72 mx-auto rounded-2xl overflow-hidden border-4 border-amber-400/60 shadow-xl">
                      <img
                        src="/owner.png"
                        alt="Founder - Hira Nisargopchar Ashram"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-forest-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                      🌿 Founder & Director
                    </div>
                  </div>

                  {/* Logo + Name below photo */}
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src="/logo.png" alt="HNA Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-white font-heading text-base font-semibold">Hira National Academy</h3>
                      <p className="text-gray-300 text-xs">Naturopathy & Yoga</p>
                    </div>
                  </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map(s => (
                      <div key={s.label} className="bg-white/10 rounded-xl p-2 sm:p-4 text-center">
                        <div className="text-amber-400 font-heading font-bold text-2xl">{s.value}</div>
                        <div className="text-gray-300 text-xs mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-white/10 rounded-xl">
                    <p className="text-gray-200 text-xs text-center">
                      🏛 Affiliated with DNYS & Gandhi National Academy of Naturopathy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-gray-400 text-xs">Scroll</span>
            <div className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-gray-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Approach"
            title="Why Choose Natural Healing?"
            subtitle="At HNA, we believe the body has the innate power to heal itself when given the right conditions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-forest-100 card-lift text-center"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-heading text-forest-800 font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE HIGHLIGHTS ───────────────────────────────────── */}
      <section className="py-20 bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Courses"
            title="Start Your Healing Journey"
            subtitle="Nationally recognised courses designed for aspiring naturopaths, yoga practitioners and wellness seekers."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {courseHighlights.map((c, i) => (
              <Link
                key={i}
                href="/courses"
                className="bg-white rounded-2xl p-8  border border-forest-100 card-lift group"
              >
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                  c.affil === 'ABPCP' ? 'bg-forest-100 text-forest-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {c.affil}
                </div>
                <div className="font-heading font-bold text-forest-700 text-3xl mb-1 group-hover:text-forest-500 transition-colors">
                  {c.name}
                </div>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">{c.full}</p>
                <div className="flex items-center gap-1.5 text-amber-600 text-base font-medium">
                  ⏱ {c.duration}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OFFER BANNER ─────────────────────────────────────────── */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-3xl mb-4">🎓</div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest-800 mb-3">
            Offline Admission Scholarship
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Visit our academy in person and avail <strong>scholarship benefits</strong> as per your eligibility!
            Offline admissions qualify for special fee concessions based on academic background and financial need.
            <br />
            <span className="text-gray-500 text-sm mt-2 block">* Online admissions are at full fee. No scholarship available online.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to visit the academy and know about scholarship eligibility.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl transition-colors"
            >
              Ask About Scholarship
            </a>
            <Link href="/consulting" className="px-7 py-3 border-2 border-forest-600 text-forest-700 hover:bg-forest-50 font-bold rounded-xl transition-colors">
              Visit Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* ── AFFILIATIONS ─────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeader tag="Recognition" title="Our Affiliations" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Akhil Bharti Prakritik Chikitsa Parishad',
                abbr: 'ABPCP',
                desc: 'National body for Naturopathy education offering C.E.N.Y., C.N.Y.T. and DNYS programmes.',
                icon: '🍃',
              },
              {
                name: 'Gandhi National Academy of Naturopathy',
                abbr: 'GNAP',
                desc: 'Academy inspired by Gandhian principles of nature cure, offering Chikitsa Sahayak and NDDY programmes.',
                icon: '🕊️',
              },
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

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #6fa642 0%, transparent 50%), radial-gradient(circle at 80% 50%, #d4963a 0%, transparent 50%)',
        }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Begin Your Natural Healing Journey Today
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Connect with us on WhatsApp to learn about admissions, schedule a visit, or book a consultation.
          </p>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent('Hello! I want to enquire about Hira National Academy.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-2xl transition-colors shadow-xl"
          >
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
