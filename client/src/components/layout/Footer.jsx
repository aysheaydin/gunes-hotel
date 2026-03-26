import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { HOTEL_CONFIG, getPhoneLink, getEmailLink } from '@/config/hotel'
import './Footer.scss'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const socialLinks = useMemo(() => [
    { 
      href: 'https://www.instagram.com/mount_nemrut_tour?igsh=MTBsZDJmN3Zva24xZA==', 
      icon: 'fa-instagram', 
      label: 'Instagram hesabımızı takip edin',
      name: 'Instagram'
    }
  ], [])

  const services = useMemo(() => [
    { icon: 'fa-wifi', text: t('footer.service1') },
    { icon: 'fa-tint', text: t('footer.service2') },
    { icon: 'fa-mountain', text: t('footer.service3') },
    { icon: 'fa-utensils', text: t('footer.service4') },
    { icon: 'fa-shuttle-van', text: t('footer.service5') }
  ], [t])

  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <Row className="footer-content">
          {/* About Section */}
          <Col lg={3} md={6} className="footer-section mb-4 mb-lg-0">
            <div className="footer-logo">
              <div className="logo-text">
                <span className="logo-main">GÜNEŞ</span>
                <span className="logo-sub">HOTEL</span>
              </div>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <nav aria-label="Sosyal medya linkleri">
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.name}
                  >
                    <i className={`fab ${link.icon}`} aria-hidden="true"></i>
                    <span className="sr-only">{link.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6} className="footer-section mb-4 mb-lg-0">
            <h2 className="footer-title">{t('footer.quickLinks')}</h2>
            <nav aria-label="Hızlı linkler">
              <ul className="footer-links">
                <li><Link to="/" aria-label="Ana sayfaya git">{t('nav.home')}</Link></li>
                <li><Link to="/about" aria-label="Hakkımızda sayfasına git">{t('nav.about')}</Link></li>
                <li><Link to="/rooms" aria-label="Odalar sayfasına git">{t('nav.rooms')}</Link></li>
                <li><Link to="/gallery" aria-label="Galeri sayfasına git">{t('nav.gallery')}</Link></li>
                <li><Link to="/contact" aria-label="İletişim sayfasına git">{t('nav.contact')}</Link></li>
              </ul>
            </nav>
          </Col>

          {/* Services */}
          <Col lg={3} md={6} className="footer-section mb-4 mb-lg-0">
            <h2 className="footer-title">{t('footer.services')}</h2>
            <ul className="footer-links" role="list">
              {services.map((service, index) => (
                <li key={index} role="listitem">
                  <i className={`fas ${service.icon}`} aria-hidden="true"></i>
                  <span>{service.text}</span>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6} className="footer-section mb-4 mb-lg-0">
            <h2 className="footer-title">{t('footer.contactInfo')}</h2>
            <address className="footer-contact">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>
                  Büyüköz, Nemrut Dağı Yolu<br />
                  44850 Pütürge/Malatya
                </span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <div>
                  <a href={getPhoneLink(HOTEL_CONFIG.phone1)} aria-label={`Telefon numarası: ${HOTEL_CONFIG.phone1Display}`}>
                    {HOTEL_CONFIG.phone1Display}
                  </a><br/>
                  <a href={getPhoneLink(HOTEL_CONFIG.phone2)} aria-label={`Telefon numarası: ${HOTEL_CONFIG.phone2Display}`}>
                    {HOTEL_CONFIG.phone2Display}
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <a href={getEmailLink()} aria-label={`E-posta: ${HOTEL_CONFIG.email}`}>
                  {HOTEL_CONFIG.email}
                </a>
              </div>
            </address>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p className="copyright">
            <small>
              {t('footer.copyright').replace('2024', currentYear)}
            </small>
          </p>
          <nav aria-label="Yasal linkler">
            <div className="footer-bottom-links">
              <Link to="/privacy" aria-label="Gizlilik politikası sayfasına git">
                Gizlilik Politikası
              </Link>
              <span className="separator" aria-hidden="true">|</span>
              <Link to="/terms" aria-label="Kullanım koşulları sayfasına git">
                Kullanım Koşulları
              </Link>
            </div>
          </nav>
        </div>
      </Container>
    </footer>
  )
}

export default Footer