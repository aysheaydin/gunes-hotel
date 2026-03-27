import React, { useEffect, lazy, Suspense, memo, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import Layout from '@components/layout/Layout'
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary'

// Lazy Loading - Sayfalar sadece gerektiğinde yüklenecek
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@pages/Home'))
const AboutPage = lazy(() => import(/* webpackChunkName: "about" */ '@pages/AboutPage'))
const RoomsPage = lazy(() => import(/* webpackChunkName: "rooms" */ '@pages/RoomsPage'))
const GalleryPage = lazy(() => import(/* webpackChunkName: "gallery" */ '@pages/GalleryPage'))
const ContactPage = lazy(() => import(/* webpackChunkName: "contact" */ '@pages/ContactPage'))
const NemrutDagiOteli = lazy(() => import(/* webpackChunkName: "nemrut-hotel" */ '@pages/NemrutDagiOteli'))
const NemrutDagiKonaklama = lazy(() => import(/* webpackChunkName: "nemrut-konaklama" */ '@pages/NemrutDagiKonaklama'))
const NemrutDagiGunDogumuTuru = lazy(() => import(/* webpackChunkName: "nemrut-gundogumu" */ '@pages/NemrutDagiGunDogumuTuru'))
const FAQ = lazy(() => import(/* webpackChunkName: "faq" */ '@pages/FAQ'))
const PrivacyPage = lazy(() => import(/* webpackChunkName: "privacy" */ '@pages/PrivacyPage'))
const TermsPage = lazy(() => import(/* webpackChunkName: "terms" */ '@pages/TermsPage'))
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */ '@pages/NotFound'))

// Loading Component - Memoized for performance
const PageLoader = memo(() => {
  const { t } = useTranslation()
  
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '1rem'
      }}
      role="status"
      aria-live="polite"
      aria-label={t('loading.pageLoading')}
    >
      <div 
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #c18c30',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
        aria-hidden="true"
      />
      <p style={{ color: '#666', fontSize: '14px' }}>{t('loading.text')}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
})

PageLoader.displayName = 'PageLoader'

function App() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const AOSRef = useRef(null)

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  // Initialize AOS only on desktop (>=768px) - saves ~30KB on mobile
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768
    
    if (isDesktop) {
      // Dynamic import - only loads AOS on desktop
      Promise.all([
        import('aos'),
        import('aos/dist/aos.css')
      ]).then(([AOS]) => {
        AOSRef.current = AOS.default
        
        AOSRef.current.init({
          duration: 800,
          easing: 'ease-out',
          once: true,
          offset: 80,
          delay: 0,
          startEvent: 'load',
          throttleDelay: 99,
          debounceDelay: 50,
          anchorPlacement: 'top-bottom'
        })
      }).catch(err => {
        console.warn('AOS failed to load:', err)
      })
    }

    return undefined
  }, [])

  useEffect(() => {
    // Scroll to top on route change - native scrollTo for better performance
    window.scrollTo(0, 0)

    // AOS refresh only if loaded and animated elements exist on page
    if (!AOSRef.current || !document.querySelector('[data-aos]')) {
      return undefined
    }

    let timeoutId
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => AOSRef.current?.refreshHard())
    } else {
      timeoutId = window.setTimeout(() => AOSRef.current?.refreshHard(), 100)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [location.pathname])

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 80,
          zIndex: 9999
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            padding: '16px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            maxWidth: '450px'
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff'
            }
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            }
          }
        }}
      />
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/nemrut-dagi-oteli" element={<NemrutDagiOteli />} />
              <Route path="/nemrut-dagi-konaklama" element={<NemrutDagiKonaklama />} />
              <Route path="/nemrut-dagi-gun-dogumu-turu" element={<NemrutDagiGunDogumuTuru />} />
              <Route path="/sss" element={<FAQ />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </>
  )
}

export default App

