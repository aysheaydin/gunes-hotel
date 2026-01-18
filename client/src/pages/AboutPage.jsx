import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import './AboutPage.scss'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Hakkımızda - Nemrut Dağı'na 2 km | 30+ Yıl Deneyim | Güneş Hotel</title>
        <meta 
          name="description" 
          content="1980'den beri Nemrut Dağı'nda hizmet veren aile oteli. Malatya Pütürge'de, UNESCO Dünya Mirası'na en yakın konaklama. 10 oda, 25 yatak kapasitesi, samimi ortam." 
        />
        <meta
          name="keywords"
          content="Güneş Hotel tarihçe, Nemrut Dağı aile oteli, Malatya Pütürge konaklama, Kommagene Krallığı turu, Nemrut yakın otel"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/about" />
      </Helmet>
      <EnhancedStructuredData page="about" />

      <div className="about-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
              <h1>{t('nav.about')}</h1>
              <p className="lead">{t('about.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* About Content */}
        <section className="section about-content">
          <Container>
            <Row className="align-items-center mb-5">
              <Col lg={6}>
                <div className="about-image">
                  <img 
                    src="/img/motel.webp" 
                    alt="Güneş Hotel" 
                    className="img-fluid rounded shadow"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="about-text">
                  <h2 className="mb-4">{t('about.heading')}</h2>
                  <div className="text-content">
                    {t('about.detailedDescription').split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            {/* Features */}
            <Row className="mt-5">
              <Col md={6} lg={3} className="mb-4" data-aos-delay="100">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h4>{t('about.features.distance')}</h4>
                  <p>{t('about.features.distanceDesc')}</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos-delay="200">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h4>{t('about.features.familyBiz')}</h4>
                  <p>{t('about.features.familyBizDesc')}</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos-delay="300">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h4>{t('about.features.cozyAtmosphere')}</h4>
                  <p>{t('about.features.cozyAtmosphereDesc')}</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos-delay="400">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-landmark"></i>
                  </div>
                  <h4>{t('about.features.historicalPlaces')}</h4>
                  <p>{t('about.features.historicalPlacesDesc')}</p>
                </div>
              </Col>
            </Row>

            {/* Historical Places */}
            <Row className="mt-5">
              <Col lg={12}>
                <div className="section-title text-center mb-5">
                  <h2>{t('about.nearbyPlaces')}</h2>
                  <p>{t('about.nearbyPlacesDesc')}</p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6} lg={4} className="mb-4">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/nemrut.webp" alt={t('about.places.nemrut.name')} className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>{t('about.places.nemrut.name')}</h4>
                    <p>{t('about.places.nemrut.desc')}</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> {t('about.places.nemrut.distance')}
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos-delay="100">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/karakus.webp" alt={t('about.places.karakus.name')} className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>{t('about.places.karakus.name')}</h4>
                    <p>{t('about.places.karakus.desc')}</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> {t('about.places.karakus.distance')}
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos-delay="200">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/cendere.webp" alt={t('about.places.cendere.name')} className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>{t('about.places.cendere.name')}</h4>
                    <p>{t('about.places.cendere.desc')}</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> {t('about.places.cendere.distance')}
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos-delay="300">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/arsemia.webp" alt={t('about.places.arsemia.name')} className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>{t('about.places.arsemia.name')}</h4>
                    <p>{t('about.places.arsemia.desc')}</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> {t('about.places.arsemia.distance')}
                    </span>
                  </div>
                </div>
              </Col>

              {/* <Col md={6} lg={4} className="mb-4" data-aos-delay="400">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-25.webp" alt={t('about.places.kahta.name')} className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>{t('about.places.kahta.name')}</h4>
                    <p>{t('about.places.kahta.desc')}</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> {t('about.places.kahta.distance')}
                    </span>
                  </div>
                </div>
              </Col> */}

              <Col md={6} lg={4} className="mb-4" data-aos-delay="500">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/pirim.webp" alt={t('about.places.perre.name')} className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>{t('about.places.perre.name')}</h4>
                    <p>{t('about.places.perre.desc')}</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> {t('about.places.perre.distance')}
                    </span>
                  </div>
                </div>
              </Col>
              
                {/* <Col md={6} lg={4} className="mb-4" data-aos-delay="600">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-27.webp" alt={t('about.places.somuncuBaba.name')} className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>{t('about.places.somuncuBaba.name')}</h4>
                      <p>{t('about.places.somuncuBaba.desc')}</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> {t('about.places.somuncuBaba.distance')}
                      </span>
                    </div>
                  </div>
                </Col> */}

                {/* <Col md={6} lg={4} className="mb-4" data-aos-delay="700">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-28.webp" alt={t('about.places.gunpinar.name')} className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>{t('about.places.gunpinar.name')}</h4>
                      <p>{t('about.places.gunpinar.desc')}</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> {t('about.places.gunpinar.distance')}
                      </span>
                    </div>
                  </div>
                </Col> */}

                <Col md={6} lg={4} className="mb-4" data-aos-delay="800">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/tohma.webp" alt={t('about.places.tohma.name')} className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>{t('about.places.tohma.name')}</h4>
                      <p>{t('about.places.tohma.desc')}</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> {t('about.places.tohma.distance')}
                      </span>
                    </div>
                  </div>
                </Col>

                {/* <Col md={6} lg={4} className="mb-4" data-aos-delay="900">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-30.webp" alt={t('about.places.levent.name')} className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>{t('about.places.levent.name')}</h4>
                      <p>{t('about.places.levent.desc')}</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> {t('about.places.levent.distance')}
                      </span>
                    </div>
                  </div>
                </Col> */}
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default AboutPage
