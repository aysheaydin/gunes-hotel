import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { HOTEL_CONFIG } from '@/config/hotel'

const EnhancedStructuredData = ({ page = 'home' }) => {
  
  // 1. HOTEL SCHEMA (Enhanced with all critical SEO fields)
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": "https://www.nemrutgunesmotel.com/#hotel",
    "name": "Güneş Hotel",
    "alternateName": ["Nemrut Güneş Motel", "Nemrut Dağı Güneş Hotel"],
    "description": "UNESCO Dünya Mirası Nemrut Dağı'na 2 km mesafede, 30+ yıl deneyimli aile oteli. Gün doğumu turları, konforlu konaklama, 24 saat sıcak su.",
    "url": "https://www.nemrutgunesmotel.com",
    "image": [
      "https://www.nemrutgunesmotel.com/img/motel.webp",
      "https://www.nemrutgunesmotel.com/img/slide-1.webp",
      "https://www.nemrutgunesmotel.com/img/slide-2.webp",
      "https://www.nemrutgunesmotel.com/img/slide-3.webp"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.nemrutgunesmotel.com/img/logo.png",
      "width": 250,
      "height": 250
    },
    "telephone": HOTEL_CONFIG.phone1,
    "email": HOTEL_CONFIG.email,
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
    "hasMap": "https://goo.gl/maps/nemrut-gunes-hotel",
    "checkinTime": "14:00",
    "checkoutTime": "12:00",
    "petsAllowed": "True",
    "numberOfRooms": 10,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "24 Saat Sıcak Su",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Ücretsiz WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Dağ Manzarası",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Ücretsiz Otopark",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Kahvaltı Dahil",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Akşam Yemeği Dahil",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Restoran",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Transfer Hizmeti",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Merkezi Isıtma",
        "value": true
      }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.nemrutgunesmotel.com/contact",
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
        "itemOffered": {
          "@type": "HotelRoom",
          "name": "Çift Kişilik Oda",
          "description": "Dağ manzaralı, 24 saat sıcak su, ücretsiz WiFi"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "1500",
          "priceCurrency": "TRY",
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "value": 2,
            "unitText": "Kişi"
          }
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "HotelRoom",
          "name": "Aile Odası",
          "description": "5 kişilik geniş oda, dağ manzaralı, aile dostu"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "3000",
          "priceCurrency": "TRY",
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "value": 5,
            "unitText": "Kişi"
          }
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01"
      }
    ],
    "tourBookingPage": "https://www.nemrutgunesmotel.com/contact"
  }

  // 2. LOCAL BUSINESS SCHEMA
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Güneş Hotel",
    "image": "https://www.nemrutgunesmotel.com/img/motel.webp",
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
    "url": "https://www.nemrutgunesmotel.com",
    "telephone": HOTEL_CONFIG.phone1,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "servesCuisine": "Türk Mutfağı",
    "acceptsReservations": "True"
  }

  // 3. BREADCRUMB LIST
  const getBreadcrumbSchema = () => {
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://www.nemrutgunesmotel.com"
        }
      ]
    }

    const pageConfig = {
      'rooms': { name: 'Odalarımız', url: 'https://www.nemrutgunesmotel.com/rooms' },
      'gallery': { name: 'Galeri', url: 'https://www.nemrutgunesmotel.com/gallery' },
      'about': { name: 'Hakkımızda', url: 'https://www.nemrutgunesmotel.com/about' },
      'contact': { name: 'İletişim', url: 'https://www.nemrutgunesmotel.com/contact' }
    }

    if (pageConfig[page]) {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": pageConfig[page].name,
        "item": pageConfig[page].url
      })
    }

    return breadcrumbs
  }

  // 4. FAQ SCHEMA (Ana sayfa için)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Nemrut Dağı'na mesafeniz kaç km?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Güneş Hotel, Nemrut Dağı zirvesine sadece 2 km mesafededir. Gün doğumu turu için otelimizden araçla yaklaşık 10 dakikada zirveye ulaşabilirsiniz. Bölgedeki en yakın otel olarak misafirlerimize büyük kolaylık sağlıyoruz."
        }
      },
      {
        "@type": "Question",
        "name": "Gün doğumu turu için hangi saatte kalkılmalı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gün doğumu turları için yaz aylarında (Mayıs-Eylül) saat 04:00-04:30, kış aylarında (Ekim-Nisan) 05:00-05:30 arası hareket edilir. Mevsime göre güneş doğuş saatleri değiştiği için güncel bilgi için resepsiyonumuzu arayabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Otel rezervasyonu nasıl yapabilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Online rezervasyon için web sitemizden iletişim formunu doldurabilir, telefonla +90 543 876 7271 numaramızı arayabilir veya WhatsApp hattımızdan bizimle iletişime geçebilirsiniz. Erken rezervasyonda özel indirim fırsatlarımız mevcuttur."
        }
      },
      {
        "@type": "Question",
        "name": "Havalimanından transfer hizmeti var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, Malatya Havalimanı (145 km) ve Adıyaman Havalimanı (85 km)'ndan otelimize transfer hizmeti sunuyoruz. Rezervasyon sırasında transfer talebinizi belirtmeniz yeterlidir. Ücretli transfer hizmetimiz mevcuttur."
        }
      },
      {
        "@type": "Question",
        "name": "Nemrut Dağı giriş ücreti ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "2026 yılı için Nemrut Dağı Milli Parkı giriş ücreti yetişkinler için 200 TL, öğrenciler için 100 TL'dir. Müze kart geçerlidir. Giriş ücretleri mevsimsel olarak değişebilir."
        }
      },
      {
        "@type": "Question",
        "name": "Otelde kahvaltı dahil mi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, tüm odalarımızda kahvaltı fiyata dahildir. Geleneksel Türk kahvaltısı ile güne başlayabilirsiniz. Özel diyet ihtiyaçlarınız varsa önceden bildirebilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Check-in ve check-out saatleri nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check-in saatimiz 14:00, check-out saatimiz 12:00'dir. Erken giriş veya geç çıkış için müsaitlik durumuna göre ek ücret karşılığında ayarlama yapılabilir."
        }
      },
      {
        "@type": "Question",
        "name": "Odalarda WiFi var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, tüm odalarımızda ve ortak alanlarda ücretsiz WiFi hizmeti mevcuttur. Giriş şifresini resepsiyondan alabilirsiniz."
        }
      }
    ]
  }

  // 5. ORGANIZATION SCHEMA
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Güneş Hotel",
    "url": "https://www.nemrutgunesmotel.com",
    "logo": "https://www.nemrutgunesmotel.com/img/logo.png",
    "description": "Nemrut Dağı'na 2 km mesafede aile oteli",
    "foundingDate": "1980",
    "sameAs": [
      "https://www.facebook.com/nemrutguneshotel",
      "https://www.instagram.com/nemrutguneshotel"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-543-876-7271",
      "contactType": "Rezervasyon",
      "availableLanguage": ["Turkish", "English", "Italian"],
      "areaServed": "TR"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pütürge",
      "addressRegion": "Malatya",
      "addressCountry": "TR"
    }
  }

  // 6. TOURIST ATTRACTION - Nemrut İlişkilendirmesi
  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Nemrut Dağı",
    "description": "UNESCO Dünya Mirası, Kommagene Krallığı'ndan kalma dev heykeller ve tümülüs",
    "url": "https://whc.unesco.org/en/list/448",
    "image": "https://www.nemrutgunesmotel.com/img/slide-3.webp",
    "touristType": "Tarih Meraklıları, Fotoğraf Tutkunları",
    "isAccessibleForFree": false,
    "publicAccess": true,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9803,
      "longitude": 38.7414
    },
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Malatya, Türkiye"
    }
  }

  return (
    <Helmet>
      {/* Hotel Schema */}
      <script type="application/ld+json">
        {JSON.stringify(hotelSchema)}
      </script>
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(getBreadcrumbSchema())}
      </script>
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* FAQ Schema - Sadece ana sayfada */}
      {page === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {/* Tourist Attraction - Ana sayfa ve about sayfasında */}
      {(page === 'home' || page === 'about') && (
        <script type="application/ld+json">
          {JSON.stringify(touristAttractionSchema)}
        </script>
      )}
    </Helmet>
  )
}

EnhancedStructuredData.propTypes = {
  page: PropTypes.oneOf([
    'home',
    'about',
    'rooms',
    'gallery',
    'contact',
    'nemrut-hotel',
    'nemrut-konaklama',
    'nemrut-gundogumu',
    'faq',
    'privacy',
    'terms'
  ])
}

export default EnhancedStructuredData
