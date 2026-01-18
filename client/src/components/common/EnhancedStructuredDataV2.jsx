import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

/**
 * Gelişmiş Schema.org yapılandırılmış veri bileşeni
 * Her sayfa için özelleştirilmiş schema markup
 */
const EnhancedStructuredData = ({ page = 'home', customData = {} }) => {
  
  const baseUrl = 'https://www.nemrutgunesmotel.com'

  // 1. ORGANIZATION SCHEMA (Tüm sayfalarda)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Güneş Hotel - Nemrut Dağı Oteli",
    "alternateName": ["Nemrut Güneş Motel", "Güneş Motel Nemrut"],
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/img/logo.png`,
      "width": 250,
      "height": 250
    },
    "image": [
      `${baseUrl}/img/motel.webp`,
      `${baseUrl}/img/slide-1.webp`,
      `${baseUrl}/img/slide-2.webp`
    ],
    "description": "UNESCO Dünya Mirası Nemrut Dağı'na 2 km mesafede aile oteli. 30+ yıl deneyim.",
    "foundingDate": "1980",
    "telephone": "+905438767271",
    "email": "info@nemrutgunesmotel.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Büyüköz, Nemrut Dağı Yolu",
      "addressLocality": "Pütürge",
      "addressRegion": "Malatya",
      "postalCode": "44850",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9853,
      "longitude": 38.7429
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+90-543-876-7271",
      "contactType": "Rezervasyon",
      "availableLanguage": ["Turkish", "English", "Italian"],
      "areaServed": "TR",
      "contactOption": "TollFree"
    }],
    "sameAs": [
      "https://www.facebook.com/nemrutguneshotel",
      "https://www.instagram.com/nemrutguneshotel"
    ]
  }

  // 2. HOTEL/LODGING BUSINESS SCHEMA (Ana sayfa ve ilgili sayfalarda)
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${baseUrl}/#hotel`,
    "name": "Güneş Hotel",
    "alternateName": "Nemrut Dağı Güneş Hotel",
    "description": "UNESCO Dünya Mirası Nemrut Dağı'na 2 km mesafede, 30+ yıl deneyimli aile oteli. Gün doğumu turları, konforlu konaklama, 24 saat sıcak su, ücretsiz WiFi.",
    "url": baseUrl,
    "image": [
      `${baseUrl}/img/motel.webp`,
      `${baseUrl}/img/slide-1.webp`,
      `${baseUrl}/img/slide-2.webp`,
      `${baseUrl}/img/slide-3.webp`,
      `${baseUrl}/img/slide-4.webp`
    ],
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/img/logo.png`
    },
    "telephone": "+905438767271",
    "email": "info@nemrutgunesmotel.com",
    "priceRange": "₺₺",
    "currenciesAccepted": "TRY, EUR, USD",
    "paymentAccepted": "Nakit, Kredi Kartı, Havale",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4",
      "bestRating": "5"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Büyüköz, Nemrut Dağı Yolu",
      "addressLocality": "Pütürge",
      "addressRegion": "Malatya",
      "postalCode": "44850",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9853,
      "longitude": 38.7429
    },
    "hasMap": "https://maps.google.com/?q=37.9853,38.7429",
    "checkinTime": "14:00",
    "checkoutTime": "12:00",
    "petsAllowed": true,
    "numberOfRooms": 13,
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "24 Saat Sıcak Su", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Ücretsiz WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Dağ Manzarası", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Ücretsiz Otopark", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Kahvaltı Dahil", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Restoran", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Transfer Hizmeti", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Merkezi Isıtma", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Gün Doğumu Turu", "value": true }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/contact`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Otel Rezervasyonu"
      }
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Çift Kişilik Oda",
        "itemOffered": {
          "@type": "HotelRoom",
          "name": "Çift Kişilik Oda",
          "description": "Dağ manzaralı, 24 saat sıcak su, ücretsiz WiFi",
          "occupancy": { "@type": "QuantitativeValue", "value": 2 }
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "1500",
          "priceCurrency": "TRY",
          "valueAddedTaxIncluded": true
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01"
      },
      {
        "@type": "Offer",
        "name": "Aile Odası",
        "itemOffered": {
          "@type": "HotelRoom",
          "name": "Aile Odası",
          "description": "5 kişilik geniş oda, dağ manzaralı, aile dostu",
          "occupancy": { "@type": "QuantitativeValue", "value": 5 }
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "3000",
          "priceCurrency": "TRY",
          "valueAddedTaxIncluded": true
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01"
      }
    ],
    "tourBookingPage": `${baseUrl}/contact`
  }

  // 3. LOCAL BUSINESS SCHEMA
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "Güneş Hotel - Nemrut Dağı",
    "image": `${baseUrl}/img/motel.webp`,
    "priceRange": "₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Büyüköz Köyü, Nemrut Dağı Yolu",
      "addressLocality": "Pütürge",
      "addressRegion": "Malatya",
      "postalCode": "44850",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9853,
      "longitude": 38.7429
    },
    "url": baseUrl,
    "telephone": "+905438767271",
    "servesCuisine": "Türk Mutfağı",
    "acceptsReservations": true,
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }]
  }

  // 4. BREADCRUMB LIST (Sayfa bazında)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": baseUrl
      }
    ]
  }

  // Sayfa bazında breadcrumb ekleme
  const breadcrumbPages = {
    rooms: { name: "Odalarımız", url: `${baseUrl}/rooms` },
    gallery: { name: "Galeri", url: `${baseUrl}/gallery` },
    about: { name: "Hakkımızda", url: `${baseUrl}/about` },
    contact: { name: "İletişim", url: `${baseUrl}/contact` },
    faq: { name: "SSS", url: `${baseUrl}/sss` },
    'nemrut-hotel': { name: "Nemrut Dağı Oteli", url: `${baseUrl}/nemrut-dagi-oteli` },
    'nemrut-konaklama': { name: "Nemrut Konaklama", url: `${baseUrl}/nemrut-dagi-konaklama` },
    'nemrut-gundogumu': { name: "Gün Doğumu Turu", url: `${baseUrl}/nemrut-dagi-gun-dogumu-turu` }
  }

  if (breadcrumbPages[page]) {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": breadcrumbPages[page].name,
      "item": breadcrumbPages[page].url
    })
  }

  // 5. WEBSITE SCHEMA
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Güneş Hotel - Nemrut Dağı Oteli",
    "description": "UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["tr", "en", "it"]
  }

  // 6. TOURIST ATTRACTION - Nemrut İlişkilendirmesi
  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": "https://whc.unesco.org/en/list/448",
    "name": "Nemrut Dağı",
    "alternateName": ["Mount Nemrut", "Nemrut Daği Milli Parkı"],
    "description": "UNESCO Dünya Mirası, Kommagene Krallığı'ndan kalma dev heykeller ve tümülüs. MÖ 62 yılında I. Antiochos tarafından inşa edilmiştir.",
    "url": "https://whc.unesco.org/en/list/448",
    "image": `${baseUrl}/img/slide-3.webp`,
    "touristType": ["Tarih Meraklıları", "Fotoğraf Tutkunları", "Doğa Severler"],
    "isAccessibleForFree": false,
    "publicAccess": true,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9803,
      "longitude": 38.7414,
      "elevation": "2134"
    },
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Malatya, Türkiye"
    }
  }

  // Custom data ile merge
  const mergedHotelSchema = { ...hotelSchema, ...customData }

  return (
    <Helmet>
      {/* Organization Schema - Her sayfada */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Website Schema - Her sayfada */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Breadcrumb Schema - Her sayfada */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Hotel Schema - Ana sayfa ve ilgili sayfalarda */}
      {(page === 'home' || page === 'rooms' || page === 'nemrut-hotel' || page === 'nemrut-konaklama') && (
        <script type="application/ld+json">
          {JSON.stringify(mergedHotelSchema)}
        </script>
      )}

      {/* Local Business Schema - Ana sayfa ve iletişim */}
      {(page === 'home' || page === 'contact') && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {/* Tourist Attraction - İlgili sayfalarda */}
      {(page === 'home' || page === 'about' || page === 'nemrut-hotel' || page === 'nemrut-gundogumu') && (
        <script type="application/ld+json">
          {JSON.stringify(touristAttractionSchema)}
        </script>
      )}
    </Helmet>
  )
}

EnhancedStructuredData.propTypes = {
  page: PropTypes.oneOf(['home', 'about', 'rooms', 'gallery', 'contact', 'faq', 'nemrut-hotel', 'nemrut-konaklama', 'nemrut-gundogumu']),
  customData: PropTypes.object
}

export default EnhancedStructuredData
