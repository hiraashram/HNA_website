import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: BASE_URL,
})

// Attach token to admin requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('hna_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const loginAdmin = (username: string, password: string) =>
  api.post('/api/auth/login', { username, password })

export const verifyAdmin = () => api.get('/api/auth/verify')

// Courses
export const getCourses = (affiliation?: string) =>
  api.get('/api/courses/', { params: affiliation ? { affiliation } : {} })

export const getAllCourses = () => api.get('/api/courses/all')

export const createCourse = (data: any) => api.post('/api/courses/', data)
export const updateCourse = (id: number, data: any) => api.put(`/api/courses/${id}`, data)
export const deleteCourse = (id: number) => api.delete(`/api/courses/${id}`)

// Gallery
export const getGallery = (category?: string) =>
  api.get('/api/gallery/', { params: category ? { category } : {} })

export const getAllGallery = () => api.get('/api/gallery/all')

export const uploadImage = (formData: FormData) =>
  api.post('/api/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateImage = (id: number, data: any) => api.put(`/api/gallery/${id}`, data)
export const deleteImage = (id: number) => api.delete(`/api/gallery/${id}`)

// About
export const getAboutSections = () => api.get('/api/about/')
export const getAllAboutSections = () => api.get('/api/about/all')
export const createAboutSection = (data: any) => api.post('/api/about/', data)
export const updateAboutSection = (id: number, data: any) => api.put(`/api/about/${id}`, data)
export const deleteAboutSection = (id: number) => api.delete(`/api/about/${id}`)

// Testimonials
export const getTestimonials = () => api.get('/api/about/testimonials')
export const addTestimonial = (data: any) => api.post('/api/about/testimonials', data)
export const deleteTestimonial = (id: number) => api.delete(`/api/about/testimonials/${id}`)

// WhatsApp helpers
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918796309503'

export const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

export const getCourseWhatsAppLink = (courseName: string) =>
  getWhatsAppLink(`Hello! I am interested in the *${courseName}* course at Hira National Academy. Please share more details about admission, fees and schedule.`)

export const getConsultWhatsAppLink = (name?: string, query?: string) =>
  getWhatsAppLink(
    `Hello! ${name ? `My name is ${name}. ` : ''}I would like to book a consultation${query ? ` regarding: ${query}` : ''} at Hira National Academy.`
  )

export const getAppointmentLink = () =>
  getWhatsAppLink('Hello! I would like to book an appointment for naturopathy consultation at Hira National Academy, Ghaziabad.')
