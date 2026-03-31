/**
 * Structured Data (Schema.org) Generators
 * Centralized structured data for SEO
 * @see https://schema.org/
 */

import { HOTEL_CONFIG, getMapLink } from '@/config/hotel'

const BASE_URL = 'https://www.nemrutgunesmotel.com'

/**
 * Hotel Schema - Main hotel/accommodation type
 * @returns {Object} Schema.org/Hotel
 */
export const getHotelSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${BASE_URL}/#hotel`,
    "name": "Güneş Hotel",
    "alternateName": ["Nemrut Güneş Motel", "Nemrut Dağı Güneş Hotel"],
    "description": "UNESCO Dünya Mirası Nemrut Dağı'na 2 km mesafede, 30+ yıl deneyimli aile oteli. Gün doğumu turları, konforlu konaklama, 24 saat sıcak su.",
    "url": BASE_URL,
    "image": [
        `${BASE_URL}/img/motel.webp`,
        `${BASE_URL}/img/slide-1.webp`,
        `${BASE_URL}/img/slide-2.webp`,
        `${BASE_URL}/img/slide-3.webp`
    ],
    "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/img/logo.png`,
        "width": 250,
        "height": 250
    },
    "telephone": HOTEL_CONFIG.phone1,
    "email": HOTEL_CONFIG.email,
    "priceRange": "€€",
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
        "streetAddress": HOTEL_CONFIG.address,
        "addressLocality": "Pütürge",
        "addressRegion": "Malatya",
        "postalCode": "44850",
        "addressCountry": "TR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": HOTEL_CONFIG.coordinates.latitude,
        "longitude": HOTEL_CONFIG.coordinates.longitude
    },
    "hasMap": getMapLink(),
    "checkinTime": "14:00",
    "checkoutTime": "12:00",
    "petsAllowed": "True",
    "numberOfRooms": 10,
    "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "24 Saat Sıcak Su", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Ücretsiz WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Dağ Manzarası", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Ücretsiz Otopark", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Kahvaltı Dahil", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Akşam Yemeği Dahil", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Restoran", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Bahçe", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Gün Doğumu Turu", "value": true }
    ],
    "makesOffer": [
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "HotelRoom",
                "name": "Double Room",
                "description": "2 kişilik çift kişilik yatak, dağ manzaralı"
            },
            "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "85",
                "priceCurrency": "EUR"
            }
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "HotelRoom",
                "name": "Twin Room",
                "description": "2 kişilik tek kişilik yataklar, dağ manzaralı"
            },
            "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "85",
                "priceCurrency": "EUR"
            }
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "HotelRoom",
                "name": "Triple Room",
                "description": "3 kişilik üç tek kişilik yatak, dağ manzaralı"
            },
            "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "115",
                "priceCurrency": "EUR"
            }
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "HotelRoom",
                "name": "Family Room",
                "description": "4 kişilik aile odası, dağ manzaralı"
            },
            "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "145",
                "priceCurrency": "EUR"
            }
        }
    ],
    "potentialAction": {
        "@type": "ReserveAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/contact`,
            "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
            ]
        },
        "result": {
            "@type": "Reservation",
            "name": "Hotel Reservation"
        }
    }
})

/**
 * Local Business Schema - For local SEO
 * @returns {Object} Schema.org/LocalBusiness
 */
export const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${BASE_URL}/#business`,
    "name": "Güneş Hotel Nemrut",
    "image": `${BASE_URL}/img/motel.webp`,
    "telephone": HOTEL_CONFIG.phone1,
    "email": HOTEL_CONFIG.email,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": HOTEL_CONFIG.address,
        "addressLocality": "Pütürge",
        "addressRegion": "Malatya",
        "postalCode": "44850",
        "addressCountry": "TR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": HOTEL_CONFIG.coordinates.latitude,
        "longitude": HOTEL_CONFIG.coordinates.longitude
    },
    "url": BASE_URL,
    "priceRange": "€€",
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
    "sameAs": [
        HOTEL_CONFIG.instagram
    ]
})

/**
 * FAQ Schema - For FAQ page rich results
 * @returns {Object} Schema.org/FAQPage
 */
export const getFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/sss#faq`,
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Nemrut Dağı'na ne kadar uzaklıktasınız?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Otelimiz Nemrut Dağı zirvesine sadece 2 km mesafededir. Gün doğumu için ideal konumdayız ve misafirlerimize ücretsiz transfer hizmeti sunuyoruz."
            }
        },
        {
            "@type": "Question",
            "name": "Gün doğumu turu dahil mi?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Evet, konaklama paketimize Nemrut Dağı gün doğumu turu dahildir. Rehberli tur ve ulaşım ücretsizdir. Sabah 04:00'te otelimizden hareket ediyoruz."
            }
        },
        {
            "@type": "Question",
            "name": "Oda fiyatlarınız nedir?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Çift kişilik odalarımız 85€, üç kişilik odalarımız 115€, aile odalarımız 145€'dan başlamaktadır. Fiyatlara kahvaltı ve akşam yemeği dahildir."
            }
        },
        {
            "@type": "Question",
            "name": "Rezervasyon için ne yapmam gerekiyor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "İletişim sayfamızdaki formu doldurabilir veya telefon ile bize ulaşabilirsiniz. Rezervasyonlarınızı en az 1 gün önceden yapmanızı öneriyoruz."
            }
        },
        {
            "@type": "Question",
            "name": "İptal politikanız nedir?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "72 saat önceden yapılan iptallerde ücret alınmaz. Son 72 saat içindeki iptallerde 1 gece ücreti tahsil edilir."
            }
        },
        {
            "@type": "Question",
            "name": "Otel tesislerinizde neler var?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Otelimizde 24 saat sıcak su, ücretsiz WiFi, otopark, restoran, kahvaltı ve akşam yemeği servisi bulunmaktadır. Tüm odalarımızda dağ manzarası vardır."
            }
        }
    ]
})

/**
 * Organization Schema - Brand/company info
 * @returns {Object} Schema.org/Organization
 */
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Güneş Hotel",
    "url": BASE_URL,
    "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/img/logo.png`,
        "width": 250,
        "height": 250
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": HOTEL_CONFIG.phone1,
        "contactType": "Rezervasyon",
        "areaServed": "TR",
        "availableLanguage": ["Turkish", "English", "Italian"]
    },
    "sameAs": [
        HOTEL_CONFIG.instagram
    ]
})

/**
 * Tourist Attraction Schema - Nemrut Mountain
 * @returns {Object} Schema.org/TouristAttraction
 */
export const getTouristAttractionSchema = () => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${BASE_URL}/#nemrut`,
    "name": "Nemrut Dağı",
    "description": "UNESCO Dünya Mirası Nemrut Dağı, tarihi heykelleri ve eşsiz gün doğumu manzarasıyla ünlüdür. 2134 metre yükseklikte, Kommagene Krallığı'ndan kalma dev heykeller bulunur.",
    "image": `${BASE_URL}/img/nemrut-panorama.webp`,
    "touristType": ["Tarih Meraklıları", "Fotoğrafçılar", "Doğa Severler"],
    "isAccessibleForFree": false,
    "publicAccess": true,
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.9800,
        "longitude": 38.7410
    },
    "containedInPlace": {
        "@type": "Place",
        "name": "Malatya",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Malatya",
            "addressCountry": "TR"
        }
    }
})

/**
 * Get schemas by page type
 * @param {string} page - Page identifier
 * @returns {Array} Array of schema objects
 */
export const getSchemasByPage = (page) => {
    const commonSchemas = [
        getHotelSchema(),
        getLocalBusinessSchema(),
        getOrganizationSchema()
    ]

    const pageSchemas = {
        home: [...commonSchemas, getTouristAttractionSchema()],
        about: commonSchemas,
        rooms: commonSchemas,
        contact: commonSchemas,
        faq: [...commonSchemas, getFAQSchema()],
        nemrut: [...commonSchemas, getTouristAttractionSchema()],
        gallery: commonSchemas
    }

    return pageSchemas[page] || commonSchemas
}
