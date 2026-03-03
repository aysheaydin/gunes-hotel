import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for reservation endpoint
 * Prevents spam and abuse
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
  // Skip rate limiting for certain IPs (optional)
  skip: (req) => {
    // Example: skip for localhost in development
    if (process.env.NODE_ENV === 'development' && req.ip === '127.0.0.1') {
      return true;
    }
    return false;
  }
});

/**
 * Rate limiter for contact form
 */
export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Max 5 contact messages per IP per 10 minutes
  message: {
    success: false,
    message: 'Çok fazla mesaj gönderdiniz. Lütfen 10 dakika sonra tekrar deneyiniz.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
