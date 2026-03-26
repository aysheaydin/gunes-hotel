import { useEffect, useCallback, useState } from 'react'

/**
 * Custom hook to preload images for better performance
 * @param {Array<string>} imageSrcs - Array of image URLs to preload
 * @param {Object} options - Preload options
 * @param {boolean} options.preloadAll - Whether to preload all images at once
 * @param {boolean} options.priority - High priority loading
 * @returns {Object} { loadedImages, isAllLoaded, preloadImage }
 */
export const useImagePreload = (imageSrcs = [], options = {}) => {
  const { preloadAll = false, priority = false } = options
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      
      if (priority) {
        img.fetchpriority = 'high'
      }
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]))
        resolve(src)
      }
      
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`)
        reject(src)
      }
      
      img.src = src
    })
  }, [priority])

  useEffect(() => {
    if (preloadAll && imageSrcs.length > 0) {
      Promise.allSettled(
        imageSrcs.map(src => preloadImage(src))
      ).then(() => {
        setIsAllLoaded(true)
      })
    }
  }, [imageSrcs, preloadAll, preloadImage])

  return {
    loadedImages,
    isAllLoaded,
    preloadImage
  }
}
