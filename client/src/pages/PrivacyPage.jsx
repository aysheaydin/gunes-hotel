import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Accordion } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const PrivacyPage = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('privacy.title')} | Güneş Hotel</title>
        <meta
          name="description"
          content="Güneş Hotel KVKK ve GDPR uyumlu kişisel verilerin korunması politikası. Veri sahibi hakları, silme talebi ve gizlilik."
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="section">
        <Container>
          <h1 className="mb-3">{t('privacy.heading')}</h1>
          <p className="text-muted mb-4"><small>{t('privacy.lastUpdated')}</small></p>
          
          <div className="mb-5">
            <p className="lead">{t('privacy.intro')}</p>
          </div>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t('privacy.dataController.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.dataController.content')}</p>
                <p><strong>{t('privacy.dataController.contact')}</strong></p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>{t('privacy.dataCollected.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.dataCollected.content')}</p>
                <ul>
                  {t('privacy.dataCollected.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>{t('privacy.purpose.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.purpose.content')}</p>
                <ul>
                  {t('privacy.purpose.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>{t('privacy.legalBasis.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.legalBasis.content')}</p>
                <ul>
                  {t('privacy.legalBasis.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>{t('privacy.retention.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.retention.content')}</p>
                <ul>
                  {t('privacy.retention.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>{t('privacy.rights.title')}</Accordion.Header>
              <Accordion.Body>
                <p><strong>{t('privacy.rights.content')}</strong></p>
                <ul>
                  {t('privacy.rights.items', { returnObjects: true }).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>{t('privacy.dataRequest.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.dataRequest.content')}</p>
                <p className="alert alert-info mb-2">
                  <strong>{t('privacy.dataRequest.method')}</strong>
                </p>
                <p><small className="text-muted">{t('privacy.dataRequest.response')}</small></p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>{t('privacy.security.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.security.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>{t('privacy.sharing.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.sharing.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>{t('privacy.cookies.title')}</Accordion.Header>
              <Accordion.Body>
                <p>{t('privacy.cookies.content')}</p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
              <Accordion.Header>{t('privacy.contact.title')}</Accordion.Header>
              <Accordion.Body>
                <p><strong>E-posta:</strong> <a href={`mailto:${t('privacy.contact.email')}`}>{t('privacy.contact.email')}</a></p>
                <p><strong>Telefon:</strong> <a href={`tel:${t('privacy.contact.phone')}`}>{t('privacy.contact.phone')}</a></p>
                <p><strong>Adres:</strong> {t('privacy.contact.address')}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPage
