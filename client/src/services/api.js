import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
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
