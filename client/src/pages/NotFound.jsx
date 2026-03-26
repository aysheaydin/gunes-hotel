import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './NotFound.scss'

const NotFound = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('notFound.title')} | Güneş Hotel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="not-found-page">
        <Container>
          <div className="not-found-content">
            <div className="error-code">404</div>
            <h1 data-aos-delay="100">{t('notFound.heading')}</h1>
            <p data-aos-delay="200">
              {t('notFound.description')}
            </p>
            <div className="not-found-actions" data-aos-delay="300">
              <Link to="/" className="btn btn-primary">
                <i className="fas fa-home"></i> {t('notFound.backToHome')}
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-envelope"></i> {t('notFound.contactUs')}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default NotFound
