import { useCallback, useState } from 'react'
import { showErrorToast, showSuccessToast, getErrorMessage } from '@utils/errorHandler'
import { isDev } from '@utils/env'

/**
 * Custom hook for consistent error handling with toast notifications
 * @returns {Object} Error handling functions and loading state
 */
export const useErrorHandler = () => {
  const [loading, setLoading] = useState(false)

  const handleError = useCallback((error, customMessage) => {
    // Only log in development
    if (isDev) {
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
    if (isDev) {
      console.log('useErrorHandler - Starting async operation')
    }
    try {
      const result = await asyncFn()
      if (isDev) {
        console.log('useErrorHandler - Success result:', result)
      }
      return { success: true, data: result }
    } catch (error) {
      if (isDev) {
        console.error('useErrorHandler - Error caught:', error)
      }
      handleError(error, errorMessage)
      return { success: false, error }
    } finally {
      setLoading(false)
      if (isDev) {
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
