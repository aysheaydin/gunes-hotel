import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import LazyImage from '@components/common/LazyImage'
import './GalleryPage.scss'

const INITIAL_VISIBLE_COUNT = 12 // Reduced from 24 for faster initial load

const galleryImages = [
  { src: '/img/gallery-1.webp', alt: 'Otel Dış Görünüm', category: 'hotel' },
  { src: '/img/gallery-2.webp', alt: 'Otel Dış Görünüm', category: 'hotel' },
  { src: '/img/gallery-3.webp', alt: 'Resepsiyon Alanı', category: 'hotel' },
  { src: '/img/gallery-5.webp', alt: 'Lounge Alanı', category: 'hotel' },
  { src: '/img/gallery-6.webp', alt: 'Restoran', category: 'hotel' },
  { src: '/img/gallery-8.webp', alt: 'Restoran', category: 'hotel' },
  { src: '/img/double-room-1.webp', alt: 'Çift Kişilik Oda', category: 'rooms' },
  { src: '/img/double-room-2.webp', alt: 'Oda Detayı', category: 'rooms' },
  { src: '/img/bathroom-1.webp', alt: 'Banyo', category: 'rooms' },
  { src: '/img/bathroom-2.webp', alt: 'Banyo Detayı', category: 'rooms' },
  { src: '/img/triple-room.webp', alt: 'Üç Kişilik Oda', category: 'rooms' },
  { src: '/img/twin-room-3.webp', alt: 'Çift Kişilik Oda Görünüm', category: 'rooms' },
  { src: '/img/gallery-9.webp', alt: 'Manzara', category: 'view' },
  { src: '/img/gallery-10.webp', alt: 'Manzara', category: 'view' },
  { src: '/img/gallery-11.webp', alt: 'Bahçe Alanı', category: 'hotel' },
  { src: '/img/gallery-12.webp', alt: 'Nemrut', category: 'view' },
  { src: '/img/gallery-13.webp', alt: 'Yemek Alanı', category: 'hotel' },
  { src: '/img/gallery-14.webp', alt: 'Restoran Detay', category: 'hotel' },
  { src: '/img/gallery-15.webp', alt: 'Otel Bahçe', category: 'hotel' },
  { src: '/img/gallery-16.webp', alt: 'Otel Bahçe', category: 'hotel' },
  { src: '/img/gallery-17.webp', alt: 'Genel Alan', category: 'hotel' },
  { src: '/img/gallery-18.webp', alt: 'Dış Mekan', category: 'hotel' },
  { src: '/img/gallery-19.webp', alt: 'Manzara', category: 'view' },
  { src: '/img/gallery-20.webp', alt: 'Nemrut', category: 'view' },
  { src: '/img/gallery-21.webp', alt: 'Manzara', category: 'view' },
  { src: '/img/gallery-22.webp', alt: 'Doğa', category: 'view' },
  { src: '/img/gallery-23.webp', alt: 'Çevre', category: 'view' },
  { src: '/img/winter.webp', alt: 'Kış Manzarası', category: 'view' },
  { src: '/img/gallery-24.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-25.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-26.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-27.webp', alt: 'Kış', category: 'view' },
  { src: '/img/gallery-28.webp', alt: 'Kış', category: 'view' },
  { src: '/img/gallery-29.webp', alt: 'Açık Hava', category: 'hotel' },
  { src: '/img/gallery-30.webp', alt: 'Yol Manzarası', category: 'view' },
  { src: '/img/gallery-31.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-36.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-37.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-38.webp', alt: 'Gün Batımı Manzarası', category: 'view' },
  { src: '/img/gallery-39.webp', alt: 'Nemrut Dağı Gün Doğumu', category: 'view' },
  { src: '/img/gallery-40.webp', alt: 'Sabah Manzarası', category: 'view' },
  { src: '/img/gallery-41.webp', alt: 'Doğa ve Tarih', category: 'view' },
  { src: '/img/gallery-42.webp', alt: 'Nemrut Panorama', category: 'view' },
  { src: '/img/gallery-43.webp', alt: 'Dağ Yolu', category: 'view' },
  { src: '/img/gallery-44.webp', alt: 'Nemrut Yolu', category: 'view' },
  { src: '/img/gallery-45.webp', alt: 'Dağ Görünümü', category: 'view' },
  { src: '/img/gallery-46.webp', alt: 'Otel Giriş', category: 'hotel' },
  { src: '/img/gallery-47.webp', alt: 'Nemrut Manzarası', category: 'view' },
  { src: '/img/gallery-48.webp', alt: 'Çift Kişilik Oda', category: 'rooms' },
  { src: '/img/gallery-52.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-53.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-54.webp', alt: 'İki Kişilik Oda', category: 'rooms' },
  { src: '/img/gallery-55.webp', alt: 'Banyo', category: 'rooms' },
  { src: '/img/gallery-56.webp', alt: 'Nemrut Dağı', category: 'view' },
  { src: '/img/gallery-57.webp', alt: 'Otel Bahçesi', category: 'hotel' },
  { src: '/img/gallery-58.webp', alt: 'Otel Girişi', category: 'hotel' },
  { src: '/img/gallery-59.webp', alt: 'Nemrut Dağı', category: 'view' },
  { src: '/img/gallery-60.webp', alt: 'Otel Dış Mekan', category: 'hotel' },
  { src: '/img/gallery-64.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-66.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-67.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-68.webp', alt: 'Otel', category: 'hotel' },
  { src: '/img/gallery-69.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-70.webp', alt: 'Otel Bahçesi', category: 'hotel' },
  { src: '/img/gallery-71.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-72.webp', alt: 'Otel Bahçesi', category: 'hotel' },
  { src: '/img/gallery-73.webp', alt: 'Yemek Alanı', category: 'hotel' },
  { src: '/img/gallery-74.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-75.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-76.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-77.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-80.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-81.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-82.webp', alt: 'Müşterilerimiz', category: 'customers' },
  { src: '/img/gallery-83.webp', alt: 'Müşterilerimiz', category: 'customers' }
]

const GalleryPage = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [filter, setFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const filteredImages = useMemo(() => {
    if (filter === 'all') return galleryImages
    return galleryImages.filter((img) => img.category === filter)
  }, [filter])

  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount)
  }, [filteredImages, visibleCount])

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    setCurrentImage(0)
  }, [filter])

  const openModal = (index) => {
    setCurrentImage(index)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeModal()
  }

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_VISIBLE_COUNT, filteredImages.length))
  }

  const hasMoreImages = visibleCount < filteredImages.length

  return (
    <>
      <Helmet>
        <title>Nemrut Dağı Fotoğraf Galerisi | Otel Odaları & Manzara - Güneş Hotel</title>
        <meta
          name="description"
          content="Nemrut Dağı ve Güneş Hotel fotoğraf galerisi. Gün doğumu manzaraları, otel odaları, restoran ve Kommagene tarihi eserleri. 100+ fotoğraf."
        />
        <meta
          name="keywords"
          content="Nemrut Dağı fotoğrafları, Nemrut gün doğumu, otel odası görselleri, Kommagene fotoğrafları, Nemrut manzara"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/gallery" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nemrut Dağı Fotoğraf Galerisi - Güneş Hotel" />
        <meta property="og:description" content="Nemrut Dağı gün doğumu, otel odaları ve manzara fotoğrafları. 100+ güzel kareler." />
        <meta property="og:url" content="https://www.nemrutgunesmotel.com/gallery" />
        <meta property="og:image" content="https://www.nemrutgunesmotel.com/img/gallery-1.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:site_name" content="Güneş Hotel" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nemrut Dağı Fotoğraf Galerisi - Güneş Hotel" />
        <meta name="twitter:description" content="Nemrut Dağı gün doğumu, otel odaları ve manzara fotoğrafları." />
        <meta name="twitter:image" content="https://www.nemrutgunesmotel.com/img/gallery-1.webp" />
      </Helmet>
      <EnhancedStructuredData page="gallery" />

      <div className="gallery-page">
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
              <h1>{t('gallery.title')}</h1>
              <p className="lead">{t('gallery.subtitle')}</p>
            </div>
          </Container>
        </section>

        <section className="section gallery-section">
          <Container>
            <div className="gallery-filters">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                <i className="fas fa-th"></i> {t('gallery.filter.all')}
              </button>
              <button className={`filter-btn ${filter === 'hotel' ? 'active' : ''}`} onClick={() => setFilter('hotel')}>
                <i className="fas fa-hotel"></i> {t('gallery.filter.hotel')}
              </button>
              <button className={`filter-btn ${filter === 'rooms' ? 'active' : ''}`} onClick={() => setFilter('rooms')}>
                <i className="fas fa-bed"></i> {t('gallery.filter.rooms')}
              </button>
              <button className={`filter-btn ${filter === 'view' ? 'active' : ''}`} onClick={() => setFilter('view')}>
                <i className="fas fa-mountain"></i> {t('gallery.filter.view')}
              </button>
              <button
                className={`filter-btn ${filter === 'customers' ? 'active' : ''}`}
                onClick={() => setFilter('customers')}
              >
                <i className="fas fa-users"></i> {t('gallery.filter.customers')}
              </button>
            </div>

            <Row className="gallery-grid">
              {visibleImages.map((image, index) => (
                <Col key={image.src} lg={4} md={6} className="gallery-item">
                  <div
                    className="gallery-card"
                    onClick={() => openModal(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openModal(index)
                      }
                    }}
                  >
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      fetchpriority={index < 3 ? 'high' : 'auto'}
                      width="600"
                      height="400"
                      className="gallery-image"
                    />
                    <div className="gallery-overlay">
                      <i className="fas fa-search-plus"></i>
                      <p>{image.alt}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {hasMoreImages && (
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={showMore}>
                  Daha Fazla Görsel Yükle ({filteredImages.length - visibleCount})
                </button>
              </div>
            )}
          </Container>
        </section>

        <Modal show={showModal} onHide={closeModal} size="xl" centered className="gallery-modal" onKeyDown={handleKeyDown}>
          <Modal.Body>
            <button className="modal-close" onClick={closeModal} aria-label="Kapat">
              <i className="fas fa-times"></i>
            </button>
            <button className="modal-prev" onClick={prevImage} aria-label="Önceki">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="modal-next" onClick={nextImage} aria-label="Sonraki">
              <i className="fas fa-chevron-right"></i>
            </button>
            <img
              src={filteredImages[currentImage]?.src}
              alt={filteredImages[currentImage]?.alt}
              className="modal-image"
              decoding="async"
            />
            <div className="modal-caption">
              <p>{filteredImages[currentImage]?.alt}</p>
              <span className="image-counter">
                {currentImage + 1} / {filteredImages.length}
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default GalleryPage
