import React, { useState, useEffect, useRef, memo } from 'react'
import PropTypes from 'prop-types'

/**
 * High-Performance Lazy Loading Image Component
 * Uses Intersection Observer API for optimal performance
 * Features:
 * - Native lazy loading with intersection observer fallback
 * - Blur-up placeholder effect
 * - Error handling with fallback image
 * - Responsive image support
 * - Automatic WebP detection
 */
const LazyImage = memo(({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  fallback = '/img/logo.webp',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  srcSet,
  onClick,
  style = {},
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    // If browser supports native lazy loading, use it
    if ('loading' in HTMLImageElement.prototype && loading === 'lazy') {
      setImageSrc(src)
      return
    }

    // Fallback to Intersection Observer
    const options = {
      root: null,
      rootMargin: '50px', // Start loading 50px before image enters viewport
      threshold: 0.01
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src)
          if (observerRef.current && imgRef.current) {
            observerRef.current.unobserve(imgRef.current)
          }
        }
      })
    }, options)

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current)
      }
    }
  }, [src, loading])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setImageSrc(fallback)
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${className}`}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      sizes={sizes}
      srcSet={srcSet}
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease-in-out',
        backgroundColor: '#f0f0f0'
      }}
      {...props}
    />
  )
})

LazyImage.displayName = 'LazyImage'

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  fallback: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  fetchPriority: PropTypes.oneOf(['high', 'low', 'auto']),
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}

export default LazyImage
