import toast from 'react-hot-toast'
import i18n from 'i18next'

/**
 * Error handler utility functions with multi-language support
 */

// Get translated error messages
const getTranslatedMessages = () => ({
  network: i18n.t('errors.network'),
  server: i18n.t('errors.server'),
  validation: i18n.t('errors.validation'),
  notFound: i18n.t('errors.notFound'),
  unauthorized: i18n.t('errors.unauthorized'),
  timeout: i18n.t('errors.timeout'),
  rateLimit: i18n.t('errors.rateLimit'),
  unknown: i18n.t('errors.unknown')
})

export const errorMessages = {
  network: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
  server: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  validation: 'Lütfen tüm alanları doğru şekilde doldurun.',
  notFound: 'Aradığınız içerik bulunamadı.',
  unauthorized: 'Bu işlem için yetkiniz bulunmamaktadır.',
  timeout: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
  rateLimit: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
  unknown: 'Beklenmeyen bir hata oluştu.'
}

export const getErrorMessage = (error) => {
  if (!error) return getTranslatedMessages().unknown

  // Network errors
  if (!error.response) {
    return getTranslatedMessages().network
  }

  // HTTP status codes
  const status = error.response?.status
  const messages = getTranslatedMessages()
  
  if (status === 404) return messages.notFound
  if (status === 401 || status === 403) return messages.unauthorized
  if (status === 408 || status === 504) return messages.timeout
  if (status === 429) return messages.rateLimit // Rate limit
  if (status >= 500) return messages.server
  if (status >= 400 && status < 500) return messages.validation

  // Custom error message from server (prioritize server message)
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  return messages.unknown
}

export const showErrorToast = (error, customMessage) => {
  const message = customMessage || getErrorMessage(error)
  const status = error?.response?.status
  
  // Rate limit için özel warning toast
  if (status === 429) {
    const retryAfter = error.response?.data?.retryAfter
    const warningMessage = retryAfter 
      ? `${message} ${retryAfter} ${i18n.t('errors.retryLater')}`
      : message
    
    return toast.error(warningMessage, {
      duration: 6000,
      position: 'top-center',
      style: {
        background: '#fff',
        color: '#92400e',
        padding: '16px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '450px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        border: '1px solid #fbbf24'
      }
    })
  }
  
  // Normal error toast
  toast.error(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#fff',
      color: '#991b1b',
      padding: '16px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
      border: '1px solid #fecaca'
    }
  })
}

export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#fff',
      color: '#065f46',
      padding: '16px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '450px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
      border: '1px solid #86efac'
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
