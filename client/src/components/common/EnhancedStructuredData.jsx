import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { getSchemasByPage } from '@/data/structuredData'

/**
 * Enhanced Structured Data Component
 * Injects Schema.org JSON-LD for SEO
 * Schemas are centralized in /data/structuredData.js
 */
const EnhancedStructuredData = ({ page = 'home' }) => {
  const schemas = getSchemasByPage(page)

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script 
          key={`schema-${page}-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

EnhancedStructuredData.propTypes = {
  page: PropTypes.oneOf([
    'home', 
    'about', 
    'rooms', 
    'contact', 
    'faq', 
    'nemrut', 
    'nemrut-hotel',
    'nemrut-konaklama',
    'nemrut-gundogumu',
    'gallery'
  ])
}

export default EnhancedStructuredData
