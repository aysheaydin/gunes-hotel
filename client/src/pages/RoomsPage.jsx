import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useRooms } from '@hooks'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import LazyImage from '@components/common/LazyImage'
import './RoomsPage.scss'

const RoomsPage = () => {
  const { t } = useTranslation()
  const rooms = useRooms()

  return (
    <>
      <Helmet>
        <title>Nemrut Dağı Otel Odaları | Çift Kişilik, Üçlü, Aile Odası - Güneş Hotel</title>
        <meta 
          name="description" 
          content="Nemrut Dağı manzaralı odalar. Çift kişilik, üçlü ve aile odası seçenekleri. 24 saat sıcak su, ücretsiz WiFi, merkezi ısıtma. Fiyatlar 1.500 TL'den başlıyor." 
        />
        <meta
          name="keywords"
          content="Nemrut otel odaları, dağ manzaralı oda, çift kişilik oda Nemrut, aile odası Malatya, otel fiyatları Nemrut"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/rooms" />
      </Helmet>
      <EnhancedStructuredData page="rooms" />

      <div className="rooms-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
              <h1>{t('rooms.title')}</h1>
              <p className="lead">{t('rooms.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* Rooms List */}
        <section className="section rooms-list">
          <Container>
            {rooms.map((room, index) => (
              <div 
                key={room.id} 
                className="room-item"
              >
                <Row className="align-items-center">
                  <Col lg={5}>
                    <div className="room-image-wrapper">
                      <LazyImage 
                        src={room.image} 
                        alt={room.name} 
                        className="img-fluid room-image"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        width="600"
                        height="400"
                      />
                      {room.popular && (
                        <Badge bg="warning" className="room-badge">
                          {t('rooms.popular')}
                        </Badge>
                      )}
                      {room.familyFriendly && (
                        <Badge bg="success" className="room-badge">
                          {t('rooms.familyFriendly')}
                        </Badge>
                      )}
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="room-details">
                      <h2>{room.name}</h2>
                      <p className="room-description">{room.description}</p>

                      <div className="room-info">
                        <div className="info-item">
                          <i className="fas fa-users"></i>
                          <span>{room.guests} {t('rooms.features.guests')}</span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-bed"></i>
                          <span>{room.beds}</span>
                        </div>
                      </div>

                      <div className="room-features">
                        <h5>{t('rooms.featuresLabel')}</h5>
                        <ul>
                          {room.features.map((feature, idx) => (
                            <li key={idx}>
                              <i className="fas fa-check-circle"></i>
                              {feature.text}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="room-footer">
                        <div className="room-price">
                          <span className="price-amount">{room.currency}{room.price}</span>
                          <span className="price-period">/ {t('rooms.perNight')}</span>
                        </div>
                        <Link to="/contact" className="btn btn-primary">
                          {t('hero.reservation')}
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Container>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <Container>
            <div className="cta-content text-center">
              <h2>{t('rooms.cta.title')}</h2>
              <p>{t('rooms.cta.description')}</p>
              <Link to="/contact" className="btn btn-light btn-lg">
                {t('rooms.cta.button')}
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default RoomsPage
