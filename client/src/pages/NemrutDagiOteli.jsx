import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'
import './NemrutDagiOteli.scss'

const NemrutDagiOteli = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Nemrut Dağı Oteli - Güneş Hotel | 2 km Mesafede | Malatya</title>
        <meta
          name="description"
          content="Nemrut Dağı'na en yakın otel: Güneş Hotel. UNESCO Dünya Mirası'na sadece 2 km! Gün doğumu turları, 30+ yıl deneyim, konforlu odalar. Hemen rezervasyon yapın."
        />
        <meta
          name="keywords"
          content="nemrut dağı oteli, nemrut otel, nemrut dağı'na en yakın otel, unesco otel, malatya nemrut otel, gün doğumu turu"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/nemrut-dagi-oteli" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nemrut Dağı Oteli - Güneş Hotel | 2 km Mesafede" />
        <meta property="og:description" content="UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel. 30+ yıl deneyim." />
        <meta property="og:url" content="https://www.nemrutgunesmotel.com/nemrut-dagi-oteli" />
        <meta property="og:image" content="https://www.nemrutgunesmotel.com/img/motel.webp" />
      </Helmet>
      <EnhancedStructuredData page="home" />

      {/* Hero Section */}
      <section className="nemrut-hero">
        <div className="nemrut-hero-overlay"></div>
        <Container>
          <Row className="align-items-center min-vh-70">
            <Col lg={8} className="text-white">
              <h1 className="display-3 fw-bold mb-4">
                Nemrut Dağı Oteli<br />
                <span className="text-warning">Sadece 2 km Mesafede</span>
              </h1>
              <p className="lead mb-4">
                UNESCO Dünya Mirası Nemrut Dağı'na en yakın konaklama tesisi. 
                1980'den beri güvenilir hizmet, samimi atmosfer, muhteşem manzara.
              </p>
              <div className="hero-features mb-5">
                <div className="feature-item">
                  <i className="fas fa-mountain text-warning"></i>
                  <span>Nemrut'a 2 km</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-certificate text-warning"></i>
                  <span>30+ Yıl Deneyim</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-star text-warning"></i>
                  <span>4.7/5 Puan</span>
                </div>
              </div>
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-warning btn-lg me-3">
                  <i className="fas fa-calendar-check me-2"></i>
                  Hemen Rezervasyon Yap
                </Link>
                <Link to="/rooms" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-bed me-2"></i>
                  Odalarımızı İncele
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
            <h2 className="display-5 fw-bold">Neden Güneş Hotel?</h2>
            <p className="lead text-muted">
              Nemrut Dağı deneyiminiz için en iyi tercih
            </p>
          </div>
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card-nemrut text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-map-marker-alt fa-3x text-primary"></i>
                </div>
                <h4>En Yakın Otel</h4>
                <p>Nemrut Dağı zirvesine sadece 2 km mesafede. Gün doğumu için ideal lokasyon.</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card-nemrut text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-history fa-3x text-success"></i>
                </div>
                <h4>30+ Yıl Deneyim</h4>
                <p>1980'den beri aile işletmesi olarak binlerce misafire hizmet verdik.</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card-nemrut text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-shuttle-van fa-3x text-warning"></i>
                </div>
                <h4>Transfer Hizmeti</h4>
                <p>Malatya ve Adıyaman havalimanlarından ücretsiz transfer imkanı.</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card-nemrut text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-heart fa-3x text-danger"></i>
                </div>
                <h4>Samimi Ortam</h4>
                <p>Aile sıcaklığında misafirperverlik, kendinizi evinizde hissedin.</p>
              </div>
            </Col>
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
              <h2 className="display-6 fw-bold mb-4">Nemrut Dağı'nın Kalbinde</h2>
              <p className="lead mb-4">
                Güneş Hotel, Malatya Pütürge'de, UNESCO Dünya Mirası Nemrut Dağı'na 
                en yakın konaklama tesisidir. 10 konforlu odamız, 25 yatak kapasitemiz 
                ve 30 kişilik restoranımızla misafirlerimize unutulmaz bir deneyim sunuyoruz.
              </p>
              
              <div className="info-list">
                <div className="info-item mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>24 Saat Sıcak Su:</strong> Kesintisiz konfor
                </div>
                <div className="info-item mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>Ücretsiz WiFi:</strong> Tüm odalarda hızlı internet
                </div>
                <div className="info-item mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>Dağ Manzarası:</strong> Tüm odalarımızda
                </div>
                <div className="info-item mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>Kahvaltı Dahil:</strong> Geleneksel Türk kahvaltısı
                </div>
                <div className="info-item mb-3">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <strong>Özel Otopark:</strong> Ücretsiz araç parkı
                </div>
              </div>

              <Link to="/about" className="btn btn-primary btn-lg mt-4">
                <i className="fas fa-info-circle me-2"></i>
                Detaylı Bilgi
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rooms Preview */}
      <section className="section bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Odalarımız</h2>
            <p className="lead text-muted">
              Konforlu ve ferah odalarımızda rahat bir konaklama
            </p>
          </div>
          <Row>
            <Col md={6} lg={4} className="mb-4">
              <div className="room-card-preview">
                <img 
                  src="/img/double-room-1.webp" 
                  alt="Çift Kişilik Oda - Nemrut Dağı" 
                  className="img-fluid"
                  loading="lazy"
                />
                <div className="room-card-body">
                  <h4>Çift Kişilik Oda</h4>
                  <p>Dağ manzaralı, konforlu çift kişilik oda</p>
                  <div className="price">
                    <strong>1.500 TL</strong> / gece
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="room-card-preview">
                <img 
                  src="/img/triple-room.webp" 
                  alt="Üçlü Oda - Nemrut Dağı" 
                  className="img-fluid"
                  loading="lazy"
                />
                <div className="room-card-body">
                  <h4>Üçlü Oda</h4>
                  <p>3 kişilik konforlu konaklama</p>
                  <div className="price">
                    <strong>2.000 TL</strong> / gece
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="room-card-preview">
                <img 
                  src="/img/family-room.webp" 
                  alt="Aile Odası - Nemrut Dağı" 
                  className="img-fluid"
                  loading="lazy"
                />
                <div className="room-card-body">
                  <h4>Aile Odası</h4>
                  <p>5 kişilik geniş aile odası</p>
                  <div className="price">
                    <strong>3.000 TL</strong> / gece
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Link to="/rooms" className="btn btn-primary btn-lg">
              Tüm Odaları Görüntüle
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Sık Sorulan Sorular</h2>
          </div>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="faq-item mb-4">
                <h4><i className="fas fa-question-circle text-primary me-2"></i>
                  Nemrut Dağı'na mesafeniz kaç km?
                </h4>
                <p className="text-muted">
                  Otelimiz Nemrut Dağı zirvesine sadece 2 km mesafededir. 
                  Araçla yaklaşık 10 dakikada zirveye ulaşabilirsiniz.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4><i className="fas fa-question-circle text-primary me-2"></i>
                  Gün doğumu turu için hangi saatte kalkmalıyız?
                </h4>
                <p className="text-muted">
                  Yaz aylarında saat 04:00-04:30, kış aylarında 05:00-05:30 arası 
                  hareket edilir. Mevsime göre saatler değişebilir.
                </p>
              </div>
              <div className="faq-item mb-4">
                <h4><i className="fas fa-question-circle text-primary me-2"></i>
                  Transfer hizmeti var mı?
                </h4>
                <p className="text-muted">
                  Evet, Malatya ve Adıyaman havalimanlarından transfer hizmetimiz mevcuttur. 
                  Rezervasyon sırasında belirtmeniz yeterlidir.
                </p>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Link to="/contact" className="btn btn-warning btn-lg">
              <i className="fas fa-phone me-2"></i>
              Daha Fazla Bilgi İçin İletişime Geçin
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default NemrutDagiOteli
