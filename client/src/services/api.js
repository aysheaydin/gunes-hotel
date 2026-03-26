import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'
let csrfToken = null

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const csrfClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

const getCsrfToken = async () => {
  if (csrfToken) {
    return csrfToken
  }

  const response = await csrfClient.get('/csrf-token')
  csrfToken = response?.data?.csrfToken || null
  return csrfToken
}

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const method = (config.method || 'get').toLowerCase()
    const isStateChanging = ['post', 'put', 'patch', 'delete'].includes(method)
    const isCsrfTokenEndpoint = (config.url || '').includes('/csrf-token')

    if (isStateChanging && !isCsrfTokenEndpoint) {
      const token = await getCsrfToken()
      if (token) {
        config.headers['X-CSRF-Token'] = token
      }
    }

    // Only log in development mode
    if (import.meta.env.MODE === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data)
    }
    return config
  },
  (error) => {
    // Only log in development mode
    if (import.meta.env.MODE === 'development') {
      console.error('API Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Only log in development mode
    if (import.meta.env.MODE === 'development') {
      console.log('API Response:', response.config.url, response.data)
    }
    return response.data
  },
  (error) => {
    if (error.response?.status === 403 && String(error.response?.data?.message || '').toLowerCase().includes('csrf')) {
      csrfToken = null
    }

    // Only log in development mode
    if (import.meta.env.MODE === 'development') {
      console.error('API Error:', error.response?.data || error.message)
    }
    return Promise.reject(error)
  }
)

export const reservationAPI = {
  create: (data) => api.post('/reservations', data)
}

export const contactAPI = {
  send: (data) => api.post('/contact', data)
}

export default api
