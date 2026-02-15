import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from 'react-bootstrap'

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Kullaným Koþullarý | Güneþ Hotel</title>
        <meta
          name="description"
          content="Güneþ Hotel web sitesi kullaným koþullarý: içerik kullanýmý, sorumluluk sýnýrlarý ve kullanýcý yükümlülükleri."
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/terms" />
      </Helmet>

      <section className="section">
        <Container>
          <h1>Kullaným Koþullarý</h1>
          <p>Bu web sitesini kullanan tüm ziyaretçiler aþaðýdaki koþullarý kabul etmiþ sayýlýr.</p>
          <p>Ýçerik bilgilendirme amaçlýdýr. Fiyat, müsaitlik ve kampanyalar için rezervasyon öncesi doðrulama yapýlmalýdýr.</p>
          <p>Koþullar hakkýnda: <a href="mailto:gunesmotel@hotmail.com">gunesmotel@hotmail.com</a></p>
        </Container>
      </section>
    </>
  )
}

export default TermsPage
