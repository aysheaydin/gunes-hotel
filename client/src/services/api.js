import axios from 'axios'
import { isDev } from '@utils/env'

const API_URL = import.meta.env.VITE_API_URL || '/api'

// CSRF token with expiry tracking
let csrfTokenData = {
  token: null,
  expiresAt: null
}

// Token TTL: 30 minutes (server session usually 1 hour)
const CSRF_TOKEN_TTL = 30 * 60 * 1000

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

/**
 * Check if CSRF token is valid and not expired
 */
const isTokenValid = () => {
  if (!csrfTokenData.token || !csrfTokenData.expiresAt) {
    return false
  }
  return Date.now() < csrfTokenData.expiresAt
}

/**
 * Fetch fresh CSRF token from server
 */
const fetchFreshToken = async () => {
  const response = await csrfClient.get('/csrf-token')
  const token = response?.data?.csrfToken || null
  
  if (token) {
    csrfTokenData = {
      token,
      expiresAt: Date.now() + CSRF_TOKEN_TTL
    }
  }
  
  return token
}

/**
 * Get CSRF token with automatic refresh
 */
const getCsrfToken = async () => {
  // Return valid cached token
  if (isTokenValid()) {
    return csrfTokenData.token
  }

  // Fetch fresh token if expired or missing
  return await fetchFreshToken()
}

/**
 * Force refresh CSRF token (used on 403 errors)
 */
const refreshCsrfToken = async () => {
  csrfTokenData = { token: null, expiresAt: null }
  return await fetchFreshToken()
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
    if (isDev) {
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data)
    }
    return config
  },
  (error) => {
    // Only log in development mode
    if (isDev) {
      console.error('API Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Response interceptor with automatic retry on CSRF errors
api.interceptors.response.use(
  (response) => {
    // Only log in development mode
    if (isDev) {
      console.log('API Response:', response.config.url, response.data)
    }
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle CSRF token errors with automatic retry
    if (
      error.response?.status === 403 &&
      String(error.response?.data?.message || '').toLowerCase().includes('csrf') &&
      !originalRequest._retry // Prevent infinite retry loop
    ) {
      originalRequest._retry = true
      
      try {
        // Refresh CSRF token
        const newToken = await refreshCsrfToken()
        
        if (newToken) {
          // Update request header with new token
          originalRequest.headers['X-CSRF-Token'] = newToken
          
          // Retry original request
          if (isDev) {
            console.log('CSRF token refreshed, retrying request:', originalRequest.url)
          }
          
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, clear token and reject
        csrfTokenData = { token: null, expiresAt: null }
        
        if (isDev) {
          console.error('CSRF token refresh failed:', refreshError)
        }
        
        return Promise.reject(error)
      }
    }

    // Only log in development mode
    if (isDev) {
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

// Export CSRF utilities for manual usage
export { refreshCsrfToken, getCsrfToken }

export default api
