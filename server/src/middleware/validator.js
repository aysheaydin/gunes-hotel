import { body, validationResult } from 'express-validator';
import { sanitizeName, sanitizeEmail, sanitizePhone, sanitizeHtml } from '../utils/sanitizer.js';

/**
 * Validation middleware for reservation
 * Updated with comprehensive sanitization and security checks
 */
export const validateReservation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('İsim soyisim gereklidir')
    .isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter arasında olmalıdır')
    .matches(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/).withMessage('İsim sadece harflerden oluşmalıdır')
    .custom(value => {
      // Block SQL injection patterns
      const sqlPatterns = /('|(--|;)|(\/\*|\*\/)|(\bOR\b|\bAND\b|\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b))/i;
      if (sqlPatterns.test(value)) {
        throw new Error('Geçersiz karakter içeriyor');
      }
      return true;
    })
    .customSanitizer(value => sanitizeName(value)),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email gereklidir')
    .isEmail().withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Telefon numarası gereklidir')
    .matches(/^[\d\s\+\-\(\)]+$/).withMessage('Geçerli bir telefon numarası giriniz')
    .isLength({ min: 10, max: 20 }).withMessage('Telefon numarası 10-20 karakter arasında olmalıdır')
    .customSanitizer(value => sanitizePhone(value)),
  
  body('checkIn')
    .notEmpty().withMessage('Giriş tarihi gereklidir')
    .isISO8601().withMessage('Geçerli bir tarih giriniz')
    .custom((value) => {
      const checkInDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if date is valid
      if (isNaN(checkInDate.getTime())) {
        throw new Error('Geçersiz tarih formatı');
      }
      
      // Check if date is not in the past
      if (checkInDate < today) {
        throw new Error('Giriş tarihi bugünden önceki bir tarih olamaz');
      }
      
      // Check if date is not too far in the future (max 2 years)
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 2);
      if (checkInDate > maxDate) {
        throw new Error('Giriş tarihi en fazla 2 yıl sonrası olabilir');
      }
      
      return true;
    }),
  
  body('checkOut')
    .notEmpty().withMessage('Çıkış tarihi gereklidir')
    .isISO8601().withMessage('Geçerli bir tarih giriniz')
    .custom((value, { req }) => {
      const checkOutDate = new Date(value);
      const checkInDate = new Date(req.body.checkIn);
      
      // Check if date is valid
      if (isNaN(checkOutDate.getTime())) {
        throw new Error('Geçersiz tarih formatı');
      }
      
      // Check if checkout is after checkin
      if (checkOutDate <= checkInDate) {
        throw new Error('Çıkış tarihi giriş tarihinden sonra olmalıdır');
      }
      
      // Check if stay duration is reasonable (max 30 days)
      const daysDiff = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
      if (daysDiff > 30) {
        throw new Error('Konaklama süresi en fazla 30 gün olabilir');
      }
      
      return true;
    }),
  
  body('guests')
    .notEmpty().withMessage('Misafir sayısı gereklidir')
    .isInt({ min: 1, max: 20 }).withMessage('Misafir sayısı 1-20 arasında olmalıdır')
    .toInt(),
  
  body('roomType')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Oda tipi 100 karakterden fazla olamaz')
    .customSanitizer(value => sanitizeHtml(value)),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Mesaj 1000 karakterden fazla olamaz')
    .customSanitizer(value => sanitizeHtml(value)),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      return res.status(400).json({
        success: false,
        message: errorMessages.join(', '),
        errors: errors.array()
      });
    }
    next();
  }
];

/**
 * Validation middleware for contact form
 * Updated with comprehensive sanitization
 */
export const validateContact = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('İsim soyisim gereklidir')
    .isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter arasında olmalıdır')
    .matches(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/).withMessage('İsim sadece harflerden oluşmalıdır')
    .custom(value => {
      // Block SQL injection patterns
      const sqlPatterns = /('|(--|;)|(\/\*|\*\/)|(\bOR\b|\bAND\b|\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b))/i;
      if (sqlPatterns.test(value)) {
        throw new Error('Geçersiz karakter içeriyor');
      }
      return true;
    })
    .customSanitizer(value => sanitizeName(value)),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email gereklidir')
    .isEmail().withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\+\-\(\)]+$/).withMessage('Geçerli bir telefon numarası giriniz')
    .isLength({ min: 10, max: 20 }).withMessage('Telefon numarası 10-20 karakter arasında olmalıdır')
    .customSanitizer(value => sanitizePhone(value)),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Konu 200 karakterden fazla olamaz')
    .customSanitizer(value => sanitizeHtml(value)),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Mesaj gereklidir')
    .isLength({ min: 10, max: 2000 }).withMessage('Mesaj 10-2000 karakter arasında olmalıdır')
    .customSanitizer(value => sanitizeHtml(value)),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      return res.status(400).json({
        success: false,
        message: errorMessages.join(', '),
        errors: errors.array()
      });
    }
    next();
  }
];
