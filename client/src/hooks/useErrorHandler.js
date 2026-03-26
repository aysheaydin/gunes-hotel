import { useCallback, useState } from 'react'
import { showErrorToast, showSuccessToast, getErrorMessage } from '@utils/errorHandler'

/**
 * Custom hook for consistent error handling with toast notifications
 * @returns {Object} Error handling functions and loading state
 */
export const useErrorHandler = () => {
  const [loading, setLoading] = useState(false)

  const handleError = useCallback((error, customMessage) => {
    // Only log in development
    if (import.meta.env.MODE === 'development') {
      console.error('Error caught by useErrorHandler:', error)
    }
    showErrorToast(error, customMessage)
    return getErrorMessage(error)
  }, [])

  const handleSuccess = useCallback((message) => {
    showSuccessToast(message)
  }, [])

  const withErrorHandling = useCallback(async (asyncFn, errorMessage) => {
    setLoading(true)
    if (import.meta.env.MODE === 'development') {
      console.log('useErrorHandler - Starting async operation')
    }
    try {
      const result = await asyncFn()
      if (import.meta.env.MODE === 'development') {
        console.log('useErrorHandler - Success result:', result)
      }
      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.error('useErrorHandler - Error caught:', error)
      }
      handleError(error, errorMessage)
      return { success: false, error }
    } finally {
      setLoading(false)
      if (import.meta.env.MODE === 'development') {
        console.log('useErrorHandler - Operation completed')
      }
    }
  }, [handleError])

  return {
    handleError,
    handleSuccess,
    withErrorHandling,
    loading
  }
}
