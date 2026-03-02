import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './About.scss'

const About = () => {
  const { t } = useTranslation()
  const [imageError, setImageError] = useState(false)

  const features = [
    {
      icon: 'fa-home',
      title: t('about.features.familyBusiness'),
      description: t('about.features.familyBusinessDesc')
    },
    {
      icon: 'fa-heart',
      title: t('about.features.warmAtmosphere'),
      description: t('about.features.warmAtmosphereDesc')
    },
    {
      icon: 'fa-star',
      title: t('about.features.uniqueLocation'),
      description: t('about.features.uniqueLocationDesc')
    }
  ]

  const handleImageError = (e) => {
    if (import.meta.env.DEV) {
      console.error('About section image failed to load:', e.target.src)
    }
    setImageError(true)
    // Fallback image
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="18"%3EGörsel Yüklenemedi%3C/text%3E%3C/svg%3E'
  }

  const imageUrl = '/img/motel.webp'

  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <Container>
        <div className="section-title">
          <h2 id="about-heading">{t('about.title')}</h2>
          <p>{t('about.subtitle')}</p>
        </div>

        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="about-image-wrapper">
              <img 
                src={imageUrl}
                alt="Güneş Hotel - Nemrut Dağı'na en yakın otel" 
                className="img-fluid about-image"
                loading="lazy"
                width="800"
                height="600"
                decoding="async"
                importance="low"
                onError={handleImageError}
              />
              {imageError && (
                <div className="image-error-overlay">
                  <p>Görsel yüklenemedi</p>
                </div>
              )}
              <div className="about-badge">
                <div className="badge-content">
                  <i className="fas fa-mountain"></i>
                  <span className="badge-number">{t('about.badgeDistance')}</span>
                  <span className="badge-text">{t('about.badgeText')}</span>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="about-content">
              <h3>{t('about.heading')}</h3>
              <div className="about-text">
                {t('about.description').split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="about-features">
                {features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <div className="feature-icon">
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                    <div className="feature-text">
                      <h5>{feature.title}</h5>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn btn-primary btn-lg">
                {t('about.learnMore')}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About