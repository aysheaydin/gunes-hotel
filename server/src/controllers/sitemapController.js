/**
 * Sitemap Controller
 * Generates dynamic XML sitemap with current dates
 */

/**
 * Generate and serve sitemap.xml
 * @route GET /sitemap.xml
 * @returns {string} XML sitemap
 */
export const generateSitemap = (req, res) => {
  const baseUrl = 'https://www.nemrutgunesmotel.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Define all routes with their priorities and change frequencies
  const routes = [
    {
      loc: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0',
      hreflang: true
    },
    {
      loc: '/nemrut-dagi-oteli',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      hreflang: false
    },
    {
      loc: '/nemrut-dagi-konaklama',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      hreflang: false
    },
    {
      loc: '/nemrut-dagi-gun-dogumu-turu',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.95',
      hreflang: false
    },
    {
      loc: '/rooms',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
      hreflang: true
    },
    {
      loc: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9',
      hreflang: true
    },
    {
      loc: '/sss',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.85',
      hreflang: false
    },
    {
      loc: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
      hreflang: true
    },
    {
      loc: '/gallery',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
      hreflang: true
    },
    {
      loc: '/privacy',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.5',
      hreflang: false
    },
    {
      loc: '/terms',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.5',
      hreflang: false
    }
  ]

  // Build XML sitemap
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n'
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'

  routes.forEach(route => {
    xml += '  <url>\n'
    xml += `    <loc>${baseUrl}${route.loc}</loc>\n`
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`
    xml += `    <priority>${route.priority}</priority>\n`
    
    // Add hreflang for multilingual pages
    if (route.hreflang) {
      xml += `    <xhtml:link rel="alternate" hreflang="tr" href="${baseUrl}${route.loc}" />\n`
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${route.loc}" />\n`
      xml += `    <xhtml:link rel="alternate" hreflang="it" href="${baseUrl}${route.loc}" />\n`
    }
    
    xml += '  </url>\n'
  })

  xml += '</urlset>'

  // Set proper headers for XML
  res.header('Content-Type', 'application/xml; charset=utf-8')
  res.header('Cache-Control', 'public, max-age=86400') // Cache for 24 hours
  res.send(xml)
}
