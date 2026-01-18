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
        <title>Nemrut Dağı Oteli - Güneş Hotel (2 km) | Malatya Pütürge Konaklama</title>
        <meta
          name="description"
          content="Nemrut Dağı'na sadece 2 km mesafede Güneş Hotel. UNESCO Dünya Mirası gün doğumu turları, 30+ yıl deneyim, konforlu odalar, 24 saat sıcak su. Hemen rezervasyon yapın!"
        />
        <meta
          name="keywords"
          content="Nemrut Dağı oteli, Nemrut otel, Nemrut konaklama, Nemrut Dağı'na en yakın otel, Malatya Pütürge otel, gün doğumu turu, UNESCO Dünya Mirası, Kommagene, Kahta otel"
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* Open Graph - Enhanced */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nemrutgunesmotel.com/" />
        <meta property="og:title" content="Nemrut Dağı Oteli - Güneş Hotel | 2 km Mesafede" />
        <meta property="og:description" content="UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel. Gün doğumu turları, konforlu konaklama. 30 yıllık deneyim." />
        <meta property="og:image" content="https://www.nemrutgunesmotel.com/img/og-image.jpg" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nemrut Dağı Oteli - Güneş Hotel" />
        <meta name="twitter:description" content="UNESCO Dünya Mirası'na 2 km mesafede. Gün doğumu turları için ideal konaklama." />
        <meta name="twitter:image" content="https://www.nemrutgunesmotel.com/img/og-image.jpg" />
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