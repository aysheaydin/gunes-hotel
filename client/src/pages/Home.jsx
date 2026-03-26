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
        <title>Nemrut Dağı Oteli - Güneş Hotel (2 km) | Rezervasyon</title>
        <meta
          name="description"
          content="Nemrut Dağı'na en yakın otel (2 km). Gün doğumu turları, konforlu odalar ve rezervasyon için Güneş Hotel."
        />
        <meta
          name="keywords"
          content="nemrut dağı oteli, nemrut otel, nemrut konaklama, malatya pötürge otel, gün doğumu turu"
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
