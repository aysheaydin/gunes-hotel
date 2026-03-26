import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TermsPage = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <Helmet>
        <title>{t('terms.title')} | Güneş Hotel</title>
        <meta
          name="description"
          content={t('terms.intro')}
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/terms" />
      </Helmet>

      <section className="section">
        <Container>
          <h1>{t('terms.heading')}</h1>
          <p>{t('terms.intro')}</p>
          <p>{t('terms.disclaimer')}</p>
          <p>{t('terms.contact')} <a href="mailto:gunesmotel@hotmail.com">gunesmotel@hotmail.com</a></p>
        </Container>
      </section>
    </>
  )
}

export default TermsPage
