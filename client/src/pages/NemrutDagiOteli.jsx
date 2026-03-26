import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import './NemrutDagiOteli.scss'

const NemrutDagiOteli = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('seoPages.nemrutOteli.title')}</title>
        <meta
          name="description"
          content={t('seoPages.nemrutOteli.description')}
        />
        <meta
          name="keywords"
          content={t('seoPages.nemrutOteli.keywords')}
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/nemrut-dagi-oteli" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nemrut Dağı Oteli - Güneş Hotel | 2 km Mesafede" />
        <meta property="og:description" content="UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel. 30+ yıl deneyim." />
        <meta property="og:url" content="https://www.nemrutgunesmotel.com/nemrut-dagi-oteli" />
        <meta property="og:image" content="https://www.nemrutgunesmotel.com/img/motel.webp" />
      </Helmet>
      <EnhancedStructuredData page="nemrut-hotel" />

      {/* Hero Section */}
      <section className="nemrut-hero">
        <div className="nemrut-hero-overlay"></div>
        <Container>
          <Row className="align-items-center min-vh-70">
            <Col lg={8} className="text-white">
              <h1 className="display-3 fw-bold mb-4">
                {t('seoPages.nemrutOteli.hero.title')}<br />
                <span className="text-warning">{t('seoPages.nemrutOteli.hero.titleHighlight')}</span>
              </h1>
              <p className="lead mb-4">
                {t('seoPages.nemrutOteli.hero.description')}
              </p>
              <div className="hero-features mb-5">
                {t('seoPages.nemrutOteli.hero.features', { returnObjects: true }).map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <i className={`fas fa-${idx === 0 ? 'mountain' : idx === 1 ? 'certificate' : 'star'} text-warning`}></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-warning btn-lg me-3">
                  <i className="fas fa-calendar-check me-2"></i>
                  {t('seoPages.nemrutOteli.hero.cta.reservation')}
                </Link>
                <Link to="/rooms" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-bed me-2"></i>
                  {t('seoPages.nemrutOteli.hero.cta.viewRooms')}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">{t('seoPages.nemrutOteli.whyChoose.heading')}</h2>
            <p className="lead text-muted">
              {t('seoPages.nemrutOteli.whyChoose.subtitle')}
            </p>
          </div>
          <Row>
            {t('seoPages.nemrutOteli.whyChoose.features', { returnObjects: true }).map((feature, idx) => {
              const icons = ['fa-map-marker-alt fa-3x text-primary', 'fa-history fa-3x text-success', 'fa-shuttle-van fa-3x text-warning', 'fa-heart fa-3x text-danger']
              return (
                <Col key={idx} md={6} lg={3} className="mb-4">
                  <div className="feature-card-nemrut text-center p-4">
                    <div className="icon-wrapper mb-3">
                      <i className={`fas ${icons[idx]}`}></i>
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>

      {/* Quick Info */}
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="/img/motel.webp" 
                alt="Güneş Hotel - Nemrut Dağı Oteli" 
                className="img-fluid rounded shadow-lg"
                loading="lazy"
              />
            </Col>
            <Col lg={6}>
              <h2 className="display-6 fw-bold mb-4">{t('seoPages.nemrutOteli.aboutSection.heading')}</h2>
              <p className="lead mb-4">
                {t('seoPages.nemrutOteli.aboutSection.description')}
              </p>
              
              <div className="info-list">
                {t('seoPages.nemrutOteli.aboutSection.infoList', { returnObjects: true }).map((item, idx) => (
                  <div key={idx} className="info-item mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    {item}
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn btn-primary btn-lg mt-4">
                <i className="fas fa-info-circle me-2"></i>
                {t('seoPages.nemrutOteli.aboutSection.cta')}
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rooms Preview */}
      <section className="section bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">{t('seoPages.nemrutOteli.roomsPreview.heading')}</h2>
            <p className="lead text-muted">
              {t('seoPages.nemrutOteli.roomsPreview.subtitle')}
            </p>
          </div>
          <Row>
            {t('seoPages.nemrutOteli.roomsPreview.rooms', { returnObjects: true }).map((room, idx) => {
              const images = ['double-room-1.webp', 'triple-room.webp', 'family-room.webp']
              return (
                <Col key={idx} md={6} lg={4} className="mb-4">
                  <div className="room-card-preview">
                    <img 
                      src={`/img/${images[idx]}`}
                      alt={room.title}
                      className="img-fluid"
                      loading="lazy"
                    />
                    <div className="room-card-body">
                      <h4>{room.title}</h4>
                      <p>{room.description}</p>
                      <div className="price">
                        <strong>{room.price}</strong>
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
          <div className="text-center mt-4">
            <Link to="/rooms" className="btn btn-primary btn-lg">
              {t('seoPages.nemrutOteli.roomsPreview.cta')}
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">{t('seoPages.nemrutOteli.faqSection.heading')}</h2>
          </div>
          <Row>
            <Col lg={8} className="mx-auto">
              {t('seoPages.nemrutOteli.faqSection.questions', { returnObjects: true }).map((faq, idx) => (
                <div key={idx} className="faq-item mb-4">
                  <h4><i className="fas fa-question-circle text-primary me-2"></i>
                    {faq.q}
                  </h4>
                  <p className="text-muted">
                    {faq.a}
                  </p>
                </div>
              ))}
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Link to="/contact" className="btn btn-warning btn-lg">
              <i className="fas fa-phone me-2"></i>
              {t('seoPages.nemrutOteli.faqSection.cta')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default NemrutDagiOteli
