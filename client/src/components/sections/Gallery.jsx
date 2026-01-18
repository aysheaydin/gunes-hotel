import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './Gallery.scss'

const Gallery = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  const galleryImages = [
    { src: '/img/gallery-1.webp', alt: 'Otel Dış Görünüm' },
    { src: '/img/gallery-2.webp', alt: 'Resepsiyon Alanı' },
    { src: '/img/gallery-3.webp', alt: 'Restoran' },
    { src: '/img/gallery-5.webp', alt: 'Nemrut Dağı Manzarası' },
    { src: '/img/gallery-6.webp', alt: 'Gün Doğumu' },
    { src: '/img/gallery-7.webp', alt: 'Çevre Manzarası' },
    { src: '/img/gallery-8.webp', alt: 'Oda İç Görünüm' },
    { src: '/img/gallery-9.webp', alt: 'Gün Batımı' }
  ]

  const handleImageError = (index, e) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="16"%3EGaleri Görseli%3C/text%3E%3C/svg%3E'
  }

  const openModal = (index) => {
    if (!imageErrors[index]) {
      setCurrentImage(index)
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Keyboard navigation for modal
  useEffect(() => {
    if (!showModal) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showModal, currentImage])

  return (
    <section id="gallery" className="section gallery-section">
      <Container>
        <div className="section-title">
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.subtitle')}</p>
        </div>

        <Row className="gallery-grid">
          {galleryImages.map((image, index) => (
            <Col 
              key={index} 
              lg={3} 
              md={4} 
              sm={6} 
              className="gallery-item"
            >
              <div 
                className={`gallery-card ${imageErrors[index] ? 'error' : ''}`}
                onClick={() => openModal(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openModal(index)
                  }
                }}
                aria-label={`${image.alt} görselini büyüt`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="img-fluid"
                  loading="lazy"
                  width="400"
                  height="300"
                  decoding="async"
                  importance="low"
                  onError={(e) => handleImageError(index, e)}
                />
                {imageErrors[index] && (
                  <div className="image-error-badge">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                )}
                <div className="gallery-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Link to="/gallery" className="btn btn-primary btn-lg">
            {t('gallery.viewAll')}
          </Link>
        </div>
      </Container>

      {/* Lightbox Modal */}
      <Modal 
        show={showModal} 
        onHide={closeModal}
        size="xl"
        centered
        className="gallery-modal"
      >
        <Modal.Body>
          <button 
            className="modal-close" 
            onClick={closeModal} 
            aria-label={t('gallery.close')}
          >
            <i className="fas fa-times"></i>
          </button>
          <button 
            className="modal-prev" 
            onClick={prevImage} 
            aria-label={t('gallery.previous')}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="modal-next" 
            onClick={nextImage} 
            aria-label={t('gallery.next')}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <img 
            src={galleryImages[currentImage]?.src} 
            alt={galleryImages[currentImage]?.alt}
            className="modal-image"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23333" width="800" height="600"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24"%3EGörsel Yüklenemedi%3C/text%3E%3C/svg%3E'
            }}
          />
          <div className="modal-caption">
            <p>{galleryImages[currentImage]?.alt}</p>
            <span className="image-counter">
              {currentImage + 1} / {galleryImages.length}
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default Gallery