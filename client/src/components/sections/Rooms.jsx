import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useRooms, useImageError } from '@hooks'
import './Rooms.scss'

const Rooms = () => {
  const { t } = useTranslation()
  const rooms = useRooms()
  const { imageErrors, handleImageError } = useImageError('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23f0f0f0" width="600" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="18"%3EOda Görseli%3C/text%3E%3C/svg%3E')

  return (
    <section id="rooms" className="section rooms-section" aria-labelledby="rooms-heading">
      <Container>
        <div className="section-title">
          <h2 id="rooms-heading">{t('rooms.title')}</h2>
          <p>{t('rooms.subtitle')}</p>
        </div>

        <Row>
          {rooms.map((room, index) => (
            <Col 
              key={room.id} 
              lg={6} 
              className="mb-4"
            >
              <article className="room-card" itemScope itemType="https://schema.org/HotelRoom">
                {room.popular && (
                  <Badge bg="warning" className="room-badge popular-badge">
                    <i className="fas fa-star" aria-hidden="true"></i> {t('rooms.popular')}
                  </Badge>
                )}
                {room.familyFriendly && (
                  <Badge bg="success" className="room-badge family-badge">
                    <i className="fas fa-home" aria-hidden="true"></i> {t('rooms.familyFriendly')}
                  </Badge>
                )}

                <div className="room-image">
                  <img 
                    src={room.image}
                    alt={`${room.name} - ${room.description}`}
                    className="img-fluid"
                    loading="lazy"
                    width="600"
                    height="400"
                    decoding="async"
                    importance="low"
                    onError={(e) => handleImageError(room.id, e)}
                  />
                  {imageErrors[room.id] && (
                    <div className="image-error-overlay">
                      <p>Oda görseli yüklenemedi</p>
                    </div>
                  )}
                  <div className="room-overlay">
                    <Link 
                      to="/rooms" 
                      className="btn btn-light"
                      aria-label={`${room.name} detaylarını görüntüle`}
                    >
                      {t('rooms.viewDetails')}
                    </Link>
                  </div>
                </div>

                <div className="room-content">
                  <h3 itemProp="name">{room.name}</h3>
                  <p className="room-description" itemProp="description">{room.description}</p>

                  <div className="room-features" role="list">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="feature" role="listitem">
                        <i className={`fas ${feature.icon}`} aria-hidden="true"></i>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="room-footer">
                    <div className="room-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <span className="price-label">{t('rooms.startingFrom')}</span>
                      <span className="price-amount" itemProp="price" content={room.price}>{room.currency}{room.price}</span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <span className="price-period">/ {t('rooms.perNight')}</span>
                    </div>
                    <Link 
                      to="/contact" 
                      className="btn btn-primary"
                      aria-label={`${room.name} için rezervasyon yap`}
                    >
                      {t('hero.reservation')}
                    </Link>
                  </div>
                </div>
              </article>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Link 
            to="/rooms" 
            className="btn btn-outline btn-lg"
            aria-label="Tüm odaları görüntüle"
          >
            {t('rooms.viewAll')}
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default Rooms