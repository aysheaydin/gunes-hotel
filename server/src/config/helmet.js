/**
 * Helmet Security Configuration
 * Comprehensive HTTP security headers setup
 * 
 * Protects against:
 * - XSS attacks
 * - Clickjacking
 * - MIME sniffing
 * - Information disclosure
 * - Man-in-the-middle attacks
 */

export const helmetConfig = {
  // Content Security Policy - Prevents XSS, injection attacks
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Allow inline scripts (needed for some frameworks)
        "'unsafe-eval'", // Allow eval (needed for some frameworks, remove if possible)
        "https://unpkg.com", // CDN for libraries
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Allow inline styles
        "https://fonts.googleapis.com",
        "https://unpkg.com",
        "https://cdn.jsdelivr.net"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://fonts.googleapis.com",
        "data:"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "http:", // Allow images from any HTTPS source
        "blob:"
      ],
      connectSrc: [
        "'self'",
        "https://gunes-otel.com",
        "http://localhost:5000",
        "http://localhost:5173"
      ],
      frameSrc: ["'none'"], // Prevent embedding in iframes
      objectSrc: ["'none'"], // Block plugins (Flash, etc.)
      mediaSrc: ["'self'", "https:", "data:"],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["'self'"],
      formAction: ["'self'"], // Only allow form submissions to same origin
      frameAncestors: ["'none'"], // Prevent clickjacking
      baseUri: ["'self'"],
      manifestSrc: ["'self'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null // Force HTTPS in production
    }
  },

  // X-DNS-Prefetch-Control - Controls browser DNS prefetching
  dnsPrefetchControl: {
    allow: false
  },

  // Expect-CT - Certificate Transparency
  expectCt: {
    enforce: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  // X-Frame-Options - Prevents clickjacking
  frameguard: {
    action: 'deny' // Don't allow site to be embedded in iframe
  },

  // X-Powered-By - Hide technology stack
  hidePoweredBy: true,

  // Strict-Transport-Security - Force HTTPS
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },

  // X-Download-Options - Prevent IE from executing downloads
  ieNoOpen: true,

  // X-Content-Type-Options - Prevent MIME type sniffing
  noSniff: true,

  // X-Permitted-Cross-Domain-Policies - Restrict Adobe Flash/PDF cross-domain
  permittedCrossDomainPolicies: {
    permittedPolicies: 'none'
  },

  // Referrer-Policy - Control referrer information
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },

  // Cross-Origin-Embedder-Policy
  crossOriginEmbedderPolicy: false, // Set to true if you need strict isolation

  // Cross-Origin-Opener-Policy
  crossOriginOpenerPolicy: {
    policy: 'same-origin'
  },

  // Cross-Origin-Resource-Policy
  crossOriginResourcePolicy: {
    policy: 'same-origin'
  },

  // Origin-Agent-Cluster
  originAgentCluster: true
};

/**
 * Additional security response headers
 */
export const additionalSecurityHeaders = (req, res, next) => {
  // Permissions Policy (formerly Feature Policy)
  res.setHeader('Permissions-Policy', [
    'accelerometer=()',
    'ambient-light-sensor=()',
    'autoplay=()',
    'battery=()',
    'camera=()',
    'display-capture=()',
    'document-domain=()',
    'encrypted-media=()',
    'execution-while-not-rendered=()',
    'execution-while-out-of-viewport=()',
    'fullscreen=(self)',
    'geolocation=()',
    'gyroscope=()',
    'magnetometer=()',
    'microphone=()',
    'midi=()',
    'navigation-override=()',
    'payment=()',
    'picture-in-picture=()',
    'publickey-credentials-get=()',
    'screen-wake-lock=()',
    'sync-xhr=()',
    'usb=()',
    'web-share=()',
    'xr-spatial-tracking=()'
  ].join(', '));

  // Server header removal (hide server information)
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');

  // Cache-Control - Prevent sensitive data caching
  if (req.method !== 'GET') {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }

  // X-Robots-Tag - Control search engine crawling
  if (req.path.includes('/api/')) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  }

  next();
};

/**
 * HTTPS Enforcement Middleware
 * Redirects HTTP to HTTPS in production
 */
export const enforceHTTPS = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
  }
  next();
};

/**
 * Disable Client-Side Caching for API Routes
 */
export const disableCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '-1');
  next();
};

export default {
  helmetConfig,
  additionalSecurityHeaders,
  enforceHTTPS,
  disableCache
};
