import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Rooms from '@components/sections/Rooms'
import Gallery from '@components/sections/Gallery'
import Contact from '@components/sections/Contact'
import EnhancedStructuredData from '@components/common/EnhancedStructuredData'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Nemrut Daðý Oteli - Güneþ Hotel (2 km) | Rezervasyon</title>
        <meta
          name="description"
          content="Nemrut Daðý'na en yakýn otel (2 km). Gün doðumu turlarý, konforlu odalar ve rezervasyon için Güneþ Hotel."
        />
        <meta
          name="keywords"
          content="nemrut daðý oteli, nemrut otel, nemrut konaklama, malatya pütürge otel, gün doðumu turu"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/" />
      </Helmet>
      <EnhancedStructuredData page="home" />

      <Hero />
      <About />
      <Rooms />
      <Gallery />
      <Contact />
    </>
  )
}

export default Home
