'use client'
import { Suspense } from 'react'


const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeUnDQfZBUjsa58F4ANKlzDX9rKO4u-jiYphPrhWsHpoglQvA/viewform'

function AdmissionRedirect() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-24">
      <div className="text-center px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-forest-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-forest-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold text-forest-800 mb-3">
          Admission Form
        </h1>
        <p className="text-gray-600 mb-2">
          Our admission form is opening in a new tab.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          If it didn't open automatically, click the button below.
        </p>
        
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-forest-600 hover:bg-forest-700 text-white font-bold text-lg rounded-2xl transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Open Admission Form
        </a>

        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto text-left">
          <h3 className="font-semibold text-amber-800 mb-2">📌 Before filling the form:</h3>
          <ul className="space-y-1.5 text-sm text-amber-700">
            <li>• Keep your Aadhar card ready</li>
            <li>• Keep all marksheets/certificates ready</li>
            <li>• Have a passport size photo ready</li>
            <li>• Files should be in PDF, JPG or PNG format</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl max-w-md mx-auto">
          <p className="text-green-700 text-sm">
            After submitting the form, our team will contact you within 24 hours on your provided phone number.
          </p>
          <a
            href="https://wa.me/919540953175?text=Hello%21%20I%20have%20filled%20the%20admission%20form.%20Please%20guide%20me%20further."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us After Submitting
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AdmissionPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-500">Loading...</div>}>
      <AdmissionRedirect />
    </Suspense>
  )
}