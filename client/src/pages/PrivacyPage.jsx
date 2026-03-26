import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const PrivacyPage = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('privacy.title')} | Güneş Hotel</title>
        <meta
          name="description"
          content={t('privacy.intro')}
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/privacy" />
      </Helmet>

      <section className="section">
        <Container>
          <h1>{t('privacy.heading')}</h1>
          <p>{t('privacy.intro')}</p>
          <p>{t('privacy.usage')}</p>
          <p>{t('privacy.contact')} <a href="mailto:gunesmotel@hotmail.com">gunesmotel@hotmail.com</a></p>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPage
