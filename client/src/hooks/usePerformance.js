import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for measuring component performance
 * @param {string} componentName - Name of the component to track
 * @param {Array} dependencies - Dependencies to watch for re-renders
 */
export const usePerformanceMonitor = (componentName, dependencies = []) => {
  const renderCount = useRef(0)
  const renderStart = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    
    if (import.meta.env.DEV) {
      const renderTime = performance.now() - renderStart.current
      
      if (renderCount.current > 1) {
        console.log(`[Performance] ${componentName}`, {
          renderNumber: renderCount.current,
          renderTime: `${renderTime.toFixed(2)}ms`,
          dependencies
        })
      }
    }
  })

  useEffect(() => {
    renderStart.current = performance.now()
  })

  return {
    renderCount: renderCount.current
  }
}

/**
 * Custom hook to debounce values for performance
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {*} Debounced value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
