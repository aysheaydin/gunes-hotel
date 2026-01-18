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
        <title>Nemrut Dağı Oteli - Güneş Hotel (2 km) | €85'den Başlayan Fiyatlar</title>
        <meta
          name="description"
          content="⭐ Nemrut Dağı'na EN YAKIN otel! (2 km) 🏞️ UNESCO gün doğumu turları, 10 konforlu oda, 30+ yıl deneyim. Kahvaltı & akşam yemeği dahil €85'den. ☎ +90 543 876 7271 - Hemen rezervasyon!"
        />
        <meta
          name="keywords"
          content="nemrut dağı oteli, nemrut otel, nemrut konaklama, nemrut dağı'na en yakın otel, malatya pütürge otel, gün doğumu turu, unesco dünya mirası, kommagene, kahta otel, nemrut güneş hotel, nemrut motel, nemrut pansiyon, nemrut rezervasyon"
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