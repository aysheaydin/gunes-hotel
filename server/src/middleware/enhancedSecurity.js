/**
 * Enhanced Security Middleware
 * Additional protections against email bombing and sophisticated attacks
 */

import rateLimit from 'express-rate-limit';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { logger } from '../utils/logger.js';

/**
 * Email-based Rate Limiter
 * Prevents same email address from spamming
 * Independent of IP address
 */
const emailLimiterStore = new RateLimiterMemory({
  points: 3, // 3 requests per email
  duration: 60 * 60, // 1 hour
  blockDuration: 60 * 60 * 2, // Block for 2 hours after limit
});

export const emailRateLimiter = async (req, res, next) => {
  const email = req.body?.email;
  
  if (!email) {
    return next(); // Let validation middleware handle missing email
  }
  
  try {
    await emailLimiterStore.consume(email.toLowerCase());
    next();
  } catch (rejRes) {
    const retryAfter = Math.round(rejRes.msBeforeNext / 1000) || 7200;
    
    logger.warn(`Email rate limit exceeded for: ${email}`);
    
    res.status(429).json({
      success: false,
      message: 'Bu email adresi çok fazla istek gönderdi. Lütfen daha sonra tekrar deneyiniz.',
      retryAfter: `${Math.round(retryAfter / 60)} dakika`
    });
  }
};

/**
 * Phone-based Rate Limiter
 * Prevents same phone number from spamming
 */
const phoneLimiterStore = new RateLimiterMemory({
  points: 5, // 5 requests per phone
  duration: 60 * 60, // 1 hour
});

export const phoneRateLimiter = async (req, res, next) => {
  const phone = req.body?.phone;
  
  if (!phone) {
    return next();
  }
  
  try {
    // Normalize phone (remove spaces, dashes)
    const normalizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    await phoneLimiterStore.consume(normalizedPhone);
    next();
  } catch (rejRes) {
    logger.warn(`Phone rate limit exceeded for: ${phone}`);
    
    res.status(429).json({
      success: false,
      message: 'Bu telefon numarası çok fazla istek gönderdi.',
      retryAfter: '1 saat'
    });
  }
};

/**
 * Honeypot Field Validator
 * Catches bots that fill hidden fields
 */
export const honeypotValidator = (req, res, next) => {
  // Check for common honeypot field names
  const honeypotFields = ['website', 'url', 'homepage', 'hidden_field'];
  
  for (const field of honeypotFields) {
    if (req.body[field]) {
      logger.warn(`Honeypot triggered from IP: ${req.ip}, Field: ${field}`);
      
      // Return success but don't actually process (silent fail)
      return res.status(200).json({
        success: true,
        message: 'Talebiniz gönderildi' // Fake success
      });
    }
  }
  
  next();
};

/**
 * Request Fingerprint
 * Creates unique fingerprint from IP + User-Agent + Headers
 * Better than IP-only rate limiting
 */
export const createFingerprint = (req) => {
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  hash.update(`${ip}${userAgent}${acceptLanguage}`);
  
  return hash.digest('hex');
};

/**
 * Enhanced Request Logger
 * Logs suspicious patterns for analysis
 */
export const suspiciousActivityLogger = (req, res, next) => {
  const suspicious = [];
  
  // Check 1: Multiple .env/.git requests
  if (req.path.includes('.env') || req.path.includes('.git')) {
    suspicious.push('sensitive_file_access');
  }
  
  // Check 2: SQL injection patterns in URL
  if (/(\bunion\b|\bselect\b|\bdrop\b|\binsert\b)/i.test(req.url)) {
    suspicious.push('sql_injection_attempt');
  }
  
  // Check 3: XSS patterns
  if (/<script|javascript:|onerror=/i.test(JSON.stringify(req.body))) {
    suspicious.push('xss_attempt');
  }
  
  // Check 4: Path traversal
  if (/\.\.\/|\.\.\\/.test(req.url)) {
    suspicious.push('path_traversal');
  }
  
  // Check 5: Unusually long requests
  const bodySize = JSON.stringify(req.body || {}).length;
  if (bodySize > 50000) { // 50KB
    suspicious.push('oversized_payload');
  }
  
  if (suspicious.length > 0) {
    logger.warn({
      message: 'Suspicious activity detected',
      ip: req.ip,
      path: req.path,
      method: req.method,
      fingerprint: createFingerprint(req),
      patterns: suspicious,
      userAgent: req.headers['user-agent']
    });
    
    // Block if multiple red flags
    if (suspicious.length >= 2) {
      return res.status(403).json({
        success: false,
        message: 'Güvenlik nedeniyle istek reddedildi.'
      });
    }
  }
  
  next();
};

/**
 * Distributed Rate Limiter (for multi-server setups)
 * Use Redis in production
 */
export const createDistributedLimiter = (options) => {
  if (process.env.REDIS_URL) {
    // Production: Use Redis
    const { RateLimiterRedis } = require('rate-limiter-flexible');
    const redis = require('redis');
    
    const redisClient = redis.createClient({
      url: process.env.REDIS_URL
    });
    
    return new RateLimiterRedis({
      storeClient: redisClient,
      ...options
    });
  } else {
    // Development: Use Memory
    return new RateLimiterMemory(options);
  }
};

/**
 * Geo-blocking (Optional)
 * Block requests from specific countries if needed
 */
export const geoBlocker = async (req, res, next) => {
  // Requires geoip-lite or MaxMind GeoIP2
  // Example implementation:
  
  // const geoip = require('geoip-lite');
  // const geo = geoip.lookup(req.ip);
  
  // const blockedCountries = process.env.BLOCKED_COUNTRIES?.split(',') || [];
  
  // if (geo && blockedCountries.includes(geo.country)) {
  //   logger.warn(`Blocked request from ${geo.country}: ${req.ip}`);
  //   return res.status(403).json({
  //     success: false,
  //     message: 'Service not available in your region'
  //   });
  // }
  
  next(); // Disabled by default
};

export default {
  emailRateLimiter,
  phoneRateLimiter,
  honeypotValidator,
  suspiciousActivityLogger,
  createFingerprint,
  createDistributedLimiter,
  geoBlocker
};
