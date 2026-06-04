'use client'
import { useState, useEffect , useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const COURSES = [
  'C.E.N.Y. – Six Month Certificate in Elementary Naturopathy & Yoga',
  'C.N.Y.T. – One Year Certificate in Naturopathy & Yoga Technique',
  'DNYS – Diploma in Naturopathy & Yogic Science',
  'Chikitsa Sahayak Certificate',
  'NDDY – Diploma in Naturopathy and Yoga',
  'Basic Computer Course (BCC)',
  'DCA – Diploma in Computer Applications',
  'ADCA – Advanced Diploma in Computer Applications',
  'Tally Prime with GST',
  'Web Designing',
  'Graphic Designing',
  'Digital Marketing',
  'BNYS – Bachelor of Naturopathy and Yogic Sciences',
  'DNYS – Diploma of Naturopathy and Yogic Sciences (University)',
  'BCA – Bachelor of Computer Applications',
  'B.Tech',
  'MBA',
  'Other',
]

const SESSIONS = ['Summer (ग्रीष्म)', 'Winter (शीतकालीन)']
const GENDERS = ['Male / पुरुष', 'Female / महिला', 'Other / अन्य']
const MEDIUMS = ['Hindi / हिंदी', 'English / अंग्रेजी']
const NATIONALITIES = ['Indian / भारतीय', 'Other / अन्य']

interface QualRow {
  exam: string
  year: string
  rollNo: string
  board: string
  subject: string
  percentage: string
}

function AdmissionForm() {
  const searchParams = useSearchParams()
  const prefilledCourse = searchParams.get('course') || ''
  const photoRef = useRef<HTMLInputElement>(null)
  const docRef   = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    session: '',
    session_year: new Date().getFullYear().toString(),
    study_centre_code: 'HNA-GZB',
    study_centre_name: 'Hira National Academy, Ghaziabad',
    programme_code: '',
    programme_name: '',
    name_hindi: '',
    name_english: '',
    father_hindi: '',
    father_english: '',
    gender: '',
    nationality: 'Indian / भारतीय',
    medium: 'Hindi / हिंदी',
    dob: '',
    phone: '',
    email: '',
    aadhar: '',
    permanent_address: '',
    permanent_pincode: '',
    local_address: '',
    local_pincode: '',
    medical_registration: '',
    last_exam_name: '',
    last_exam_year: '',
    last_exam_roll: '',
    declaration_place: 'Ghaziabad',
    declaration_date: new Date().toISOString().split('T')[0],
  })

  const [qualifications, setQualifications] = useState<QualRow[]>([
    { exam: '', year: '', rollNo: '', board: '', subject: '', percentage: '' },
    { exam: '', year: '', rollNo: '', board: '', subject: '', percentage: '' },
    { exam: '', year: '', rollNo: '', board: '', subject: '', percentage: '' },
  ])

  const [photoFile, setPhotoFile]   = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [docFile, setDocFile]       = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const course = searchParams.get('course')
    if (course) {
      setForm(f => ({ ...f, programme_name: decodeURIComponent(course) }))
    }
  }, [searchParams])

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const setQual = (i: number, key: keyof QualRow, val: string) => {
    setQualifications(q => q.map((r, idx) => idx === i ? { ...r, [key]: val } : r))
  }

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const buildWhatsAppMessage = () => {
    const q = qualifications.filter(r => r.exam).map((r, i) =>
      `  ${i+1}. ${r.exam} | ${r.year} | Roll: ${r.rollNo} | ${r.board} | ${r.subject} | ${r.percentage}%`
    ).join('\n')

    return `🎓 *ADMISSION FORM – Hira National Academy*
━━━━━━━━━━━━━━━━━━━━━━
📋 *Session:* ${form.session} ${form.session_year}
📚 *Course Applied:* ${form.programme_name}

👤 *PERSONAL DETAILS*
• Name (Hindi): ${form.name_hindi}
• Name (English): ${form.name_english}
• Father's Name (Hindi): ${form.father_hindi}
• Father's Name (English): ${form.father_english}
• Gender: ${form.gender}
• Date of Birth: ${form.dob}
• Nationality: ${form.nationality}
• Medium: ${form.medium}

📱 *CONTACT*
• Phone: ${form.phone}
• Email: ${form.email}
• Aadhar No.: ${form.aadhar}

🏠 *ADDRESS*
• Permanent: ${form.permanent_address}, Pin: ${form.permanent_pincode}
• Local: ${form.local_address || form.permanent_address}, Pin: ${form.local_pincode || form.permanent_pincode}

🎓 *EDUCATIONAL QUALIFICATION*
${q}

📝 *Last Exam:* ${form.last_exam_name} | Year: ${form.last_exam_year} | Roll No: ${form.last_exam_roll}

${form.medical_registration ? `🏥 Medical Registration: ${form.medical_registration}` : ''}

📍 *Place:* ${form.declaration_place}
📅 *Date:* ${form.declaration_date}

━━━━━━━━━━━━━━━━━━━━━━
_Please share your photo and documents separately._`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name_english || !form.phone || !form.programme_name) {
      alert('Please fill Name, Phone and Course fields.')
      return
    }
    setSubmitting(true)
    const msg = buildWhatsAppMessage()
    const waLink = `https://wa.me/919540953175?text=${encodeURIComponent(msg)}`
    window.open(waLink, '_blank')
    setSubmitting(false)
  }

  return (
    <>
      {/* Header */}
      <div className="hero-gradient pt-28 pb-12 text-center relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
            Admission Form
          </h1>
          <p className="text-gray-300">नामांकन/परीक्षा आवेदन पत्र / Enrollment & Examination Form</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2">
            <span className="text-amber-300 text-sm">Hira National Academy, Ghaziabad</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── TOP HEADER SECTION ── */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">

              {/* Photo upload */}
              <div className="flex-shrink-0">
                <div
                  className="w-28 h-32 border-2 border-dashed border-forest-300 rounded-xl overflow-hidden bg-forest-50 flex flex-col items-center justify-center cursor-pointer hover:border-forest-500 transition-colors"
                  onClick={() => photoRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Photo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <div className="text-2xl mb-1">📷</div>
                      <div className="text-xs text-gray-400 text-center">Paste Self Attested Photo</div>
                    </div>
                  )}
                </div>
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                <p className="text-xs text-center text-gray-400 mt-1">Click to upload photo</p>
              </div>

              <div className="flex-1 space-y-4">
                {/* Session */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-style">Session / सत्र *</label>
                    <select value={form.session} onChange={e => set('session', e.target.value)} required className="input-style">
                      <option value="">Select Session</option>
                      {SESSIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label-style">Year / वर्ष *</label>
                    <input type="text" value={form.session_year} onChange={e => set('session_year', e.target.value)} className="input-style" placeholder="2025" />
                  </div>
                </div>

                {/* Study Centre */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-style">Study Centre Code / अध्ययन केन्द्र का कोड</label>
                    <input type="text" value={form.study_centre_code} readOnly className="input-style bg-gray-50" />
                  </div>
                  <div>
                    <label className="label-style">Name of Study Centre / अध्ययन केन्द्र का नाम</label>
                    <input type="text" value={form.study_centre_name} readOnly className="input-style bg-gray-50" />
                  </div>
                </div>

                {/* Programme */}
                <div>
                  <label className="label-style">Course / पाद्यक्रम का नाम *</label>
                  {form.programme_name && !COURSES.includes(form.programme_name) ? (
                    <input
                        type="text"
                        value={form.programme_name}
                        onChange={e => set('programme_name', e.target.value)}
                        className="input-style"
                        required
                    />
                    ) : (
                    <select value={form.programme_name} onChange={e => set('programme_name', e.target.value)} required className="input-style">
                        <option value="">Select Course</option>
                        {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* ── PERSONAL DETAILS ── */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-sm p-6">
            <h2 className="font-heading text-forest-800 font-bold text-xl mb-5 pb-2 border-b border-forest-100">
              Personal Details / व्यक्तिगत विवरण
            </h2>
            <div className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">अभ्यर्थी का नाम हिन्दी में *</label>
                  <input type="text" value={form.name_hindi} onChange={e => set('name_hindi', e.target.value)} className="input-style" placeholder="हिंदी में नाम लिखें" required />
                </div>
                <div>
                  <label className="label-style">Applicant's Name in English *</label>
                  <input type="text" value={form.name_english} onChange={e => set('name_english', e.target.value.toUpperCase())} className="input-style" placeholder="FULL NAME IN ENGLISH" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">पिता का नाम हिन्दी में *</label>
                  <input type="text" value={form.father_hindi} onChange={e => set('father_hindi', e.target.value)} className="input-style" placeholder="पिता का नाम हिंदी में" required />
                </div>
                <div>
                  <label className="label-style">Father's Name in English *</label>
                  <input type="text" value={form.father_english} onChange={e => set('father_english', e.target.value.toUpperCase())} className="input-style" placeholder="FATHER'S NAME IN ENGLISH" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label-style">लिंग / Gender *</label>
                  <select value={form.gender} onChange={e => set('gender', e.target.value)} required className="input-style">
                    <option value="">Select</option>
                    {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-style">नागरिकता / Nationality</label>
                  <select value={form.nationality} onChange={e => set('nationality', e.target.value)} className="input-style">
                    {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-style">माध्यम / Medium</label>
                  <select value={form.medium} onChange={e => set('medium', e.target.value)} className="input-style">
                    {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">जन्मतिथि / Date of Birth *</label>
                  <input type="date" value={form.dob} onChange={e => set('dob', e.target.value)} required className="input-style" />
                </div>
                <div>
                  <label className="label-style">फोन नं / Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required className="input-style" placeholder="+91 XXXXXXXXXX" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">ईमेल / Email ID</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-style" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="label-style">आधार संख्या / Aadhar UID No.</label>
                  <input type="text" value={form.aadhar} onChange={e => set('aadhar', e.target.value)} className="input-style" placeholder="XXXX XXXX XXXX" maxLength={14} />
                </div>
              </div>
            </div>
          </div>

          {/* ── ADDRESS ── */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-sm p-6">
            <h2 className="font-heading text-forest-800 font-bold text-xl mb-5 pb-2 border-b border-forest-100">
              Address / पता
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="label-style">स्थायी पता / Permanent Address *</label>
                <textarea value={form.permanent_address} onChange={e => set('permanent_address', e.target.value)} required rows={3} className="input-style resize-none" placeholder="Full permanent address..." />
                <div>
                  <label className="label-style">पिनकोड / Pin Code</label>
                  <input type="text" value={form.permanent_pincode} onChange={e => set('permanent_pincode', e.target.value)} className="input-style" placeholder="XXXXXX" maxLength={6} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="label-style">स्थानीय पता / Local Address</label>
                <textarea value={form.local_address} onChange={e => set('local_address', e.target.value)} rows={3} className="input-style resize-none" placeholder="Local address (if different)..." />
                <div>
                  <label className="label-style">पिनकोड / Pin Code</label>
                  <input type="text" value={form.local_pincode} onChange={e => set('local_pincode', e.target.value)} className="input-style" placeholder="XXXXXX" maxLength={6} />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="label-style">पंजीकृत चिकित्सक हों तो / If Registered Medical Practitioner (Registration details)</label>
              <input type="text" value={form.medical_registration} onChange={e => set('medical_registration', e.target.value)} className="input-style" placeholder="Name of Authority, Year and Registration No." />
            </div>
          </div>

          {/* ── EDUCATIONAL QUALIFICATION ── */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-sm p-6">
            <h2 className="font-heading text-forest-800 font-bold text-xl mb-5 pb-2 border-b border-forest-100">
              Educational Qualification / शैक्षिक व तकनाका योग्यता
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-50">
                    <th className="p-2 text-left text-forest-700 font-semibold border border-forest-100">Exam / परीक्षा का नाम</th>
                    <th className="p-2 text-left text-forest-700 font-semibold border border-forest-100">Year & Roll / उत्तीर्ण वर्ष व रोल नं</th>
                    <th className="p-2 text-left text-forest-700 font-semibold border border-forest-100">Board/University</th>
                    <th className="p-2 text-left text-forest-700 font-semibold border border-forest-100">Main Subject / मुख्य विषय</th>
                    <th className="p-2 text-left text-forest-700 font-semibold border border-forest-100">% Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {qualifications.map((row, i) => (
                    <tr key={i} className="border-b border-forest-50">
                      <td className="p-1 border border-forest-100">
                        <input type="text" value={row.exam} onChange={e => setQual(i, 'exam', e.target.value)} className="w-full px-2 py-1.5 text-sm border-0 outline-none" placeholder={i === 0 ? 'e.g. 10th / High School' : i === 1 ? 'e.g. 12th / Intermediate' : 'e.g. Graduation'} />
                      </td>
                      <td className="p-1 border border-forest-100">
                        <div className="flex gap-1">
                          <input type="text" value={row.year} onChange={e => setQual(i, 'year', e.target.value)} className="w-16 px-2 py-1.5 text-sm border-0 outline-none" placeholder="Year" />
                          <input type="text" value={row.rollNo} onChange={e => setQual(i, 'rollNo', e.target.value)} className="flex-1 px-2 py-1.5 text-sm border-0 outline-none" placeholder="Roll No." />
                        </div>
                      </td>
                      <td className="p-1 border border-forest-100">
                        <input type="text" value={row.board} onChange={e => setQual(i, 'board', e.target.value)} className="w-full px-2 py-1.5 text-sm border-0 outline-none" placeholder="Board name" />
                      </td>
                      <td className="p-1 border border-forest-100">
                        <input type="text" value={row.subject} onChange={e => setQual(i, 'subject', e.target.value)} className="w-full px-2 py-1.5 text-sm border-0 outline-none" placeholder="Main subject" />
                      </td>
                      <td className="p-1 border border-forest-100">
                        <input type="text" value={row.percentage} onChange={e => setQual(i, 'percentage', e.target.value)} className="w-full px-2 py-1.5 text-sm border-0 outline-none" placeholder="%" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" onClick={() => setQualifications(q => [...q, { exam: '', year: '', rollNo: '', board: '', subject: '', percentage: '' }])}
              className="mt-3 text-sm text-forest-600 hover:text-forest-800 font-medium flex items-center gap-1">
              + Add Row
            </button>

            <div className="mt-4">
              <label className="label-style">अंतिम उत्तीर्ण परीक्षा का नाम, वर्ष व रोल नं / Last Exam Passed – Name, Year & Roll No.</label>
              <div className="grid grid-cols-3 gap-3 mt-1">
                <input type="text" value={form.last_exam_name} onChange={e => set('last_exam_name', e.target.value)} className="input-style" placeholder="Exam name" />
                <input type="text" value={form.last_exam_year} onChange={e => set('last_exam_year', e.target.value)} className="input-style" placeholder="Year" />
                <input type="text" value={form.last_exam_roll} onChange={e => set('last_exam_roll', e.target.value)} className="input-style" placeholder="Roll No." />
              </div>
            </div>
          </div>

          {/* ── DOCUMENTS UPLOAD ── */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-sm p-6">
            <h2 className="font-heading text-forest-800 font-bold text-xl mb-5 pb-2 border-b border-forest-100">
              Documents / दस्तावेज
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-sm font-medium">📌 Important Note:</p>
              <p className="text-amber-700 text-sm mt-1">After submitting the form via WhatsApp, please send the following documents separately on WhatsApp:</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-700">
                <li>• Self-attested photo</li>
                <li>• Aadhar Card copy</li>
                <li>• All marksheets/certificates (self-attested)</li>
                <li>• Any other relevant certificates</li>
              </ul>
            </div>

            <div>
              <label className="label-style">Attach Documents (optional – you can send on WhatsApp later)</label>
              <div
                className="mt-1 border-2 border-dashed border-forest-200 rounded-xl p-6 text-center cursor-pointer hover:border-forest-400 transition-colors"
                onClick={() => docRef.current?.click()}
              >
                <div className="text-3xl mb-2">📎</div>
                <p className="text-sm text-gray-500">{docFile ? docFile.name : 'Click to attach documents (PDF, JPG, PNG)'}</p>
              </div>
              <input ref={docRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => setDocFile(e.target.files?.[0] || null)} />
            </div>
          </div>

          {/* ── DECLARATION ── */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-sm p-6">
            <h2 className="font-heading text-forest-800 font-bold text-xl mb-4 pb-2 border-b border-forest-100">
              Declaration / अभ्यर्थी द्वारा घोषणा पत्र
            </h2>
            <div className="bg-forest-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed mb-5">
              <p className="mb-2 font-medium text-forest-800">मैं एतद्द्वारा विधिवत घोषणा करता/करती हूँ कि उपर्युक्त दी गई सभी सूचनाएँ सत्य हैं।</p>
              <p>I hereby declare that the particulars stated in this application form are true to the best of my knowledge and belief. I have read the prospectus and the admission/eligibility requirements as laid down by the Parishad and I shall abide by them. I have attached all the required self-attested documents with this form.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-style">स्थान / Place</label>
                <input type="text" value={form.declaration_place} onChange={e => set('declaration_place', e.target.value)} className="input-style" />
              </div>
              <div>
                <label className="label-style">दिनांक / Date</label>
                <input type="date" value={form.declaration_date} onChange={e => set('declaration_date', e.target.value)} className="input-style" />
              </div>
            </div>
          </div>

          {/* ── SUBMIT ── */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <h3 className="font-heading text-green-800 font-bold text-lg mb-2">Submit Your Form</h3>
            <p className="text-green-700 text-sm mb-5">
              Your form details will be sent directly to Hira National Academy via WhatsApp.
              Please send your documents separately on WhatsApp after submitting.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold text-lg rounded-2xl transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {submitting ? 'Opening WhatsApp...' : 'Submit via WhatsApp'}
            </button>
           <p className="text-xs text-gray-400 mt-3">
              WhatsApp will open with your pre-filled form details
            </p>

            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              type="button"
              onClick={() => {
                const subject = `Admission Form – ${form.programme_name} – ${form.name_english}`
                const body = `ADMISSION FORM – Hira National Academy
━━━━━━━━━━━━━━━━━━━━━━
                Session: ${form.session} ${form.session_year}
                Course Applied: ${form.programme_name}

                PERSONAL DETAILS
                Name (Hindi): ${form.name_hindi}
                Name (English): ${form.name_english}
                Father's Name (Hindi): ${form.father_hindi}
                Father's Name (English): ${form.father_english}
                Gender: ${form.gender}
                Date of Birth: ${form.dob}
                Nationality: ${form.nationality}
                Medium: ${form.medium}

                CONTACT
                Phone: ${form.phone}
                Email: ${form.email}
                Aadhar No.: ${form.aadhar}

                ADDRESS
                Permanent: ${form.permanent_address}, Pin: ${form.permanent_pincode}
                Local: ${form.local_address || form.permanent_address}, Pin: ${form.local_pincode || form.permanent_pincode}

                EDUCATIONAL QUALIFICATION
                ${qualifications.filter(r => r.exam).map((r, i) => `${i+1}. ${r.exam} | Year: ${r.year} | Roll: ${r.rollNo} | ${r.board} | ${r.subject} | ${r.percentage}%`).join('\n')}

                Last Exam: ${form.last_exam_name} | Year: ${form.last_exam_year} | Roll No: ${form.last_exam_roll}

                ${form.medical_registration ? `Medical Registration: ${form.medical_registration}` : ''}

                Place: ${form.declaration_place}
                Date: ${form.declaration_date}

                        ━━━━━━━━━━━━━━━━━━━━━━
                Note: Please attach your photo, Aadhar card and marksheets with this email.`

                window.location.href = `mailto:info.hiraashram@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
              }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Submit via Email
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Your email app will open with pre-filled form details.<br/>
              Please attach your documents before sending.
            </p>
          </div>

        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/courses" className="text-forest-600 hover:text-forest-800 text-sm font-medium">
            ← Back to Courses
          </Link>
        </div>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1.5px solid #d1e8c8;
          border-radius: 0.625rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
          background: white;
        }
        .input-style:focus {
          border-color: #3a6e1e;
        }
        .label-style {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default function AdmissionPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
      <AdmissionForm />
    </Suspense>
  )
}