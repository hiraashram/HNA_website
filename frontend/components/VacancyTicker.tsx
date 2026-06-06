'use client'
import { useState, useEffect } from 'react'

interface Vacancy {
  id: number
  title: string
  location: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function VacancyTicker() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/vacancy/`)
      .then(r => r.json())
      .then(data => setVacancies(data))
      .catch(() => {})
  }, [])

  if (vacancies.length === 0) return null

  const tickerText = vacancies.map(v =>
    `📢 Vacancy: ${v.title} | Location: ${v.location}`
  ).join('     ★     ')

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 998,
      backgroundColor: '#1e3a0d',
      borderTop: '2px solid #d4963a',
      padding: '8px 0',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
      }}>
        {/* Label */}
        <div style={{
          backgroundColor: '#d4963a',
          color: '#1e3a0d',
          fontWeight: 'bold',
          fontSize: '12px',
          padding: '4px 14px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          zIndex: 1,
        }}>
          🔔 JOB VACANCY
        </div>

        {/* Moving text */}
        <div style={{
          overflow: 'hidden',
          flex: 1,
        }}>
          <div style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: 'tickerMove 30s linear infinite',
            color: '#fcd34d',
            fontSize: '13px',
            fontWeight: '500',
            paddingLeft: '20px',
          }}>
            {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {tickerText}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tickerMove {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}