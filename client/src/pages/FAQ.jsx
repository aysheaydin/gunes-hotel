import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { HOTEL_CONFIG, getPhoneLink, getEmailLink, getWhatsAppLink } from '@/config/hotel'
import './FAQ.scss'

const FAQ = () => {
  const { t } = useTranslation()
  
  // Translation-based FAQ data
  const faqData = [
    {
      category: t('faq.categories.accommodation'),
      questions: t('faq.questions.accommodation', { returnObjects: true })
    },
    {
      category: t('faq.categories.nemrut'),
      questions: t('faq.questions.nemrut', { returnObjects: true })
    },
    {
      category: t('faq.categories.facilities'),
      questions: t('faq.questions.facilities', { returnObjects: true })
    },
    {
      category: t('faq.categories.transportation'),
      questions: t('faq.questions.transportation', { returnObjects: true })
    },
    {
      category: t('faq.categories.general'),
      questions: t('faq.questions.general', { returnObjects: true })
    }
  ]

  // FAQPage Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category => 
      category.questions.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    )
  }

  return (
    <>
      <Helmet>
        <title>{t('faq.title')}</title>
        <meta
          name="description"
          content={t('faq.metaDescription')}
        />
        <meta
          name="keywords"
          content={t('faq.metaKeywords')}
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/sss" />
        
        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Page Header */}
      <section className="faq-header">
        <div className="faq-header-overlay"></div>
        <Container>
          <div className="faq-header-content text-center text-white">
            <h1 className="display-4 fw-bold mb-3">{t('faq.heading')}</h1>
            <p className="lead">
              {t('faq.subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Content */}
      <section className="section bg-light">
        <Container>
          <Row>
            <Col lg={10} xl={9} className="mx-auto">
              {faqData.map((category, catIndex) => (
                <div key={catIndex} className="faq-category mb-5">
                  <h2 className="category-title mb-4">
                    <i className="fas fa-folder-open text-primary me-2"></i>
                    {category.category}
                  </h2>
                  <Accordion defaultActiveKey="0" flush>
                    {category.questions.map((item, qIndex) => {
                      const itemKey = `${catIndex}-${qIndex}`
                      return (
                        <Accordion.Item 
                          key={itemKey} 
                          eventKey={itemKey}
                          className="mb-3 faq-accordion-item"
                        >
                          <Accordion.Header>
                            <i className="fas fa-question-circle text-warning me-3"></i>
                            {item.q}
                          </Accordion.Header>
                          <Accordion.Body>
                            <p className="mb-0">{item.a}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    })}
                  </Accordion>
                </div>
              ))}
            </Col>
          </Row>

          {/* Contact CTA */}
          <Row className="mt-5">
            <Col lg={8} className="mx-auto">
              <div className="contact-cta text-center p-5 bg-white rounded shadow-sm">
                <h3 className="mb-3">{t('faq.contactCta.title')}</h3>
                <p className="text-muted mb-4">
                  {t('faq.contactCta.description')}
                </p>
                <div className="cta-buttons">
                  <a 
                    href={getPhoneLink(HOTEL_CONFIG.phone1)} 
                    className="btn btn-primary btn-lg me-3 mb-2"
                  >
                    <i className="fas fa-phone me-2"></i>
                    {HOTEL_CONFIG.phone1Display}
                  </a>
                  <a 
                    href={getEmailLink()} 
                    className="btn btn-outline-primary btn-lg me-3 mb-2"
                  >
                    <i className="fas fa-envelope me-2"></i>
                    {t('faq.contactCta.emailLabel')}
                  </a>
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-success btn-lg mb-2"
                  >
                    <i className="fab fa-whatsapp me-2"></i>
                    {t('faq.contactCta.whatsappLabel')}
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default FAQ