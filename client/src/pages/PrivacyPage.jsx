import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from 'react-bootstrap'

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Gizlilik Politikasý | Güneþ Hotel</title>
        <meta
          name="description"
          content="Güneþ Hotel web sitesi gizlilik politikasý: hangi verilerin toplandýðý, nasýl kullanýldýðý ve kullanýcý haklarý."
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/privacy" />
      </Helmet>

      <section className="section">
        <Container>
          <h1>Gizlilik Politikasý</h1>
          <p>Bu sayfa, web sitemizi kullanýrken iþlenen kiþisel veriler ve veri güvenliði süreçleri hakkýnda bilgi verir.</p>
          <p>Ýletiþim formlarý üzerinden iletilen veriler yalnýzca talebinizi yanýtlamak amacýyla kullanýlýr ve üçüncü taraflarla paylaþýlmaz.</p>
          <p>Talepleriniz için: <a href="mailto:gunesmotel@hotmail.com">gunesmotel@hotmail.com</a></p>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPage
