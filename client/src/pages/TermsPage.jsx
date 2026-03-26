import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TermsPage = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('terms.title')} | Güneş Hotel</title>
        <meta
          name="description"
          content="Güneş Hotel web sitesi kullanım koşulları, rezervasyon politikası, iptal koşulları ve yasal bilgiler."
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="section">
        <Container>
          <h1 className="mb-3">{t('terms.heading')}</h1>
          <p className="text-muted mb-4"><small>{t('terms.lastUpdated')}</small></p>
          
          <div className="mb-5">
            <p className="lead">{t('terms.intro')}</p>
          </div>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t('terms.acceptance.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.acceptance.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>{t('terms.services.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.services.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>{t('terms.reservation.title')}</Accordion.Header>
              <Accordion.Body>
                <ul>
                  {t('terms.reservation.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>{t('terms.payment.title')}</Accordion.Header>
              <Accordion.Body>
                <ul>
                  {t('terms.payment.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>{t('terms.intellectual.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.intellectual.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>{t('terms.liability.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.liability.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>{t('terms.links.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.links.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>{t('terms.changes.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.changes.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>{t('terms.law.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.law.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>{t('terms.contact.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('terms.contact.content')}</p>
                <p><strong>E-posta:</strong> <a href={`mailto:${t('terms.contact.email')}`}>{t('terms.contact.email')}</a></p>
                <p><strong>Telefon:</strong> <a href={`tel:${t('terms.contact.phone')}`}>{t('terms.contact.phone')}</a></p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>
    </>
  )
}

export default TermsPage
