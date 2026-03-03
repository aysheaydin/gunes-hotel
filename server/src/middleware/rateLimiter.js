import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

/**
 * Rate limiter for reservation endpoint
 * Prevents spam and abuse
 * Enhanced with stricter limits and logging
 */
export const reservationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Max 3 reservations per IP per 15 minutes
  message: {
    success: false,
    message: 'Çok fazla rezervasyon talebi gönderdiniz. Lütfen 15 dakika sonra tekrar deneyiniz.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  
  // Skip rate limiting for certain IPs in development
  skip: (req) => {
    // Example: skip for localhost in development
    if (process.env.NODE_ENV === 'development' && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1')) {
      return true;
    }
    return false;
  },
  
  // Custom handler with logging
  handler: (req, res) => {
    logger.warn(`Reservation rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Çok fazla rezervasyon talebi gönderdiniz. Lütfen 15 dakika sonra tekrar deneyiniz.',
      retryAfter: '15 minutes'
    });
  },
  
  // Key generator (use IP + user agent for better tracking)
  keyGenerator: (req) => {
    return `${req.ip}_${req.headers['user-agent']}`;
  }
});

/**
 * Rate limiter for contact form
 * Slightly more lenient than reservation
 */
export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Max 5 contact messages per IP per 10 minutes
  message: {
    success: false,
    message: 'Çok fazla mesaj gönderdiniz. Lütfen 10 dakik sonra tekrar deneyiniz.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  
  // Skip rate limiting in development for localhost
  skip: (req) => {
    if (process.env.NODE_ENV === 'development' && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1')) {
      return true;
    }
    return false;
  },
  
  handler: (req, res) => {
    logger.warn(`Contact rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Çok fazla mesaj gönderdiniz. Lütfen 10 dakika sonra tekrar deneyiniz.',
      retryAfter: '10 minutes'
    });
  },
  
  keyGenerator: (req) => {
    return `${req.ip}_${req.headers['user-agent']}`;
  }
});

/**
 * General API rate limiter
 * Protects against DDoS and brute force attacks
 */
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per IP per minute
  message: {
    success: false,
    message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyiniz.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    logger.warn(`API rate limit exceeded for IP: ${req.ip}, Path: ${req.path}`);
    res.status(429).json({
      success: false,
      message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyiniz.',
      retryAfter: '1 minute'
    });
  },
  
  keyGenerator: (req) => {
    return req.ip;
  }
});
