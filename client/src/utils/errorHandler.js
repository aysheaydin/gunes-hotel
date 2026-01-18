import toast from 'react-hot-toast'

/**
 * Error handler utility functions
 */

export const errorMessages = {
  network: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
  server: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  validation: 'Lütfen tüm alanları doğru şekilde doldurun.',
  notFound: 'Aradığınız içerik bulunamadı.',
  unauthorized: 'Bu işlem için yetkiniz bulunmamaktadır.',
  timeout: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
  unknown: 'Beklenmeyen bir hata oluştu.'
}

export const getErrorMessage = (error) => {
  if (!error) return errorMessages.unknown

  // Network errors
  if (!error.response) {
    return errorMessages.network
  }

  // HTTP status codes
  const status = error.response?.status
  
  if (status === 404) return errorMessages.notFound
  if (status === 401 || status === 403) return errorMessages.unauthorized
  if (status === 408 || status === 504) return errorMessages.timeout
  if (status >= 500) return errorMessages.server
  if (status >= 400 && status < 500) return errorMessages.validation

  // Custom error message from server
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  return errorMessages.unknown
}

export const showErrorToast = (error, customMessage) => {
  const message = customMessage || getErrorMessage(error)
  
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px'
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444'
    }
  })
}

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px'
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981'
    },
    ...options
  })
}

export const showInfoToast = (message, options = {}) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#3b82f6',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px'
    },
    icon: 'ℹ️',
    ...options
  })
}

export const showLoadingToast = (message) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#6b7280',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px'
    }
  })
}
