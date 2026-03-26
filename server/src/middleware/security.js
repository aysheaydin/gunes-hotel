import { doubleCsrf } from 'csrf-csrf';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import { detectSuspiciousPatterns, validateRequestHeaders } from '../utils/sanitizer.js';
import { logger } from '../utils/logger.js';

/**
 * CSRF Protection Middleware
 * Protects against Cross-Site Request Forgery attacks
 * 
 * Usage:
 * - Add csrfProtection to routes that modify data (POST, PUT, DELETE)
 * - Client must include CSRF token in requests
 */
export const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'your-csrf-secret-change-this-in-production',
  cookieName: '__Host-psifi.x-csrf-token',
  cookieOptions: {
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => req.headers['x-csrf-token'] || req.body._csrf
});

/**
 * CSRF token generator endpoint
 * GET /api/csrf-token
 */
export const csrfTokenRoute = (req, res) => {
  const token = generateToken(req, res);
  res.json({ csrfToken: token });
};

/**
 * HTTP Parameter Pollution (HPP) Protection
 * Prevents attacks that use duplicate parameters
 */
export const hppProtection = hpp({
  whitelist: ['guests', 'roomType'] // Allow these parameters to be arrays
});

/**
 * Global Rate Limiter
 * Protects against DDoS and brute force attacks
 * Applies to ALL API endpoints
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per 15 minutes
  message: {
    success: false,
    message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyiniz.'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  // Skip rate limiting for health check and localhost in development ONLY
  skip: (req) => {
    if (req.path === '/health') return true;
    
    // PRODUCTION: NEVER skip rate limiting
    if (process.env.NODE_ENV === 'production') return false;
    
    // Development: Only exact localhost IPs
    const isLocalhost = req.ip === '127.0.0.1' || req.ip === '::1';
    return process.env.NODE_ENV === 'development' && isLocalhost;
  },
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyiniz.',
      retryAfter: '15 minutes'
    });
  }
});

/**
 * Suspicious Input Detection Middleware
 * Detects and blocks potentially malicious inputs
 */
export const suspiciousInputDetection = (req, res, next) => {
  try {
    // Check all input fields for suspicious patterns
    const allInputs = { ...req.body, ...req.query, ...req.params };
    
    for (const [key, value] of Object.entries(allInputs)) {
      if (typeof value === 'string' && detectSuspiciousPatterns(value)) {
        logger.warn(`Suspicious input detected from IP ${req.ip}: ${key}`);
        return res.status(400).json({
          success: false,
          message: 'Geçersiz karakter veya format tespit edildi.'
        });
      }
    }
    
    next();
  } catch (error) {
    logger.error('Suspicious input detection error:', error);
    next();
  }
};

/**
 * Request Header Validation Middleware
 * Prevents header injection attacks
 */
export const headerValidation = (req, res, next) => {
  try {
    validateRequestHeaders(req.headers);
    next();
  } catch (error) {
    logger.warn(`Invalid headers detected from IP ${req.ip}`);
    return res.status(400).json({
      success: false,
      message: 'Geçersiz istek başlıkları.'
    });
  }
};

/**
 * Request Size Limiter
 * Prevents DoS attacks via large payloads
 */
export const requestSizeLimiter = {
  json: { limit: '10kb' }, // Max JSON payload: 10KB
  urlencoded: { limit: '10kb', extended: true } // Max URL-encoded payload: 10KB
};

/**
 * IP-based Access Control (optional)
 * Can be used to block specific IPs or allow only whitelisted IPs
 */
export const ipAccessControl = (req, res, next) => {
  // Example: Block specific IPs (add to environment variables if needed)
  const blockedIPs = process.env.BLOCKED_IPS?.split(',') || [];
  
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (blockedIPs.includes(clientIP)) {
    logger.warn(`Blocked IP attempted access: ${clientIP}`);
    return res.status(403).json({
      success: false,
      message: 'Erişim reddedildi.'
    });
  }
  
  next();
};

/**
 * Slow Down Middleware (Progressive delay)
 * Alternative to hard rate limiting - adds delay for frequent requests
 */
export const slowDown = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests per 15 minutes at full speed
  delayMs: 500, // Add 500ms delay per request after 50
  maxDelayMs: 20000, // Max delay: 20 seconds
});

/**
 * Brute Force Protection for Authentication
 * (Not used currently as we don't have login, but ready for future use)
 */
export const bruteForceProtection = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 failed attempts
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    message: 'Çok fazla başarısız deneme. Hesabınız geçici olarak kilitlendi.'
  }
});

/**
 * Security Headers Validation
 * Ensures requests have proper origin and referer
 */
export const originValidation = (req, res, next) => {
  // Skip validation in development mode
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  
  const allowedOrigins = [
    process.env.CORS_ORIGIN,
    'https://gunes-otel.com',
    'https://www.gunes-otel.com',
    'https://www.nemrutgunesmotel.com'
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // Skip validation for GET requests and health check
  if (req.method === 'GET' || req.path === '/health') {
    return next();
  }
  
  // Check if origin or referer is from allowed list
  const isValidOrigin = !origin || allowedOrigins.some(allowed => origin?.startsWith(allowed));
  const isValidReferer = !referer || allowedOrigins.some(allowed => referer?.startsWith(allowed));
  
  if (!isValidOrigin && !isValidReferer) {
    logger.warn(`Invalid origin/referer from IP ${req.ip}: ${origin || referer}`);
    return res.status(403).json({
      success: false,
      message: 'Geçersiz kaynak.'
    });
  }
  
  next();
};

export default {
  doubleCsrfProtection,
  csrfTokenRoute,
  hppProtection,
  globalRateLimiter,
  suspiciousInputDetection,
  headerValidation,
  requestSizeLimiter,
  ipAccessControl,
  slowDown,
  bruteForceProtection,
  originValidation
};
