import { body, validationResult } from 'express-validator';

/**
 * Validation middleware for reservation
 */
export const validateReservation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('İsim soyisim gereklidir')
    .isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter arasında olmalıdır')
    .matches(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/).withMessage('İsim sadece harflerden oluşmalıdır'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email gereklidir')
    .isEmail().withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Telefon numarası gereklidir')
    .matches(/^[\d\s\+\-\(\)]+$/).withMessage('Geçerli bir telefon numarası giriniz'),
  
  body('checkIn')
    .notEmpty().withMessage('Giriş tarihi gereklidir')
    .isISO8601().withMessage('Geçerli bir tarih giriniz')
    .custom((value) => {
      const checkInDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        throw new Error('Giriş tarihi bugünden önceki bir tarih olamaz');
      }
      return true;
    }),
  
  body('checkOut')
    .notEmpty().withMessage('Çıkış tarihi gereklidir')
    .isISO8601().withMessage('Geçerli bir tarih giriniz')
    .custom((value, { req }) => {
      const checkOutDate = new Date(value);
      const checkInDate = new Date(req.body.checkIn);
      if (checkOutDate <= checkInDate) {
        throw new Error('Çıkış tarihi giriş tarihinden sonra olmalıdır');
      }
      return true;
    }),
  
  body('guests')
    .notEmpty().withMessage('Misafir sayısı gereklidir')
    .isInt({ min: 1, max: 20 }).withMessage('Misafir sayısı 1-20 arasında olmalıdır'),
  
  body('roomType')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Oda tipi 100 karakterden fazla olamaz'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Mesaj 1000 karakterden fazla olamaz')
    .customSanitizer(value => {
      // XSS protection: remove potential harmful characters
      return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }),

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
 */
export const validateContact = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('İsim soyisim gereklidir')
    .isLength({ min: 2, max: 100 }).withMessage('İsim 2-100 karakter arasında olmalıdır')
    .matches(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/).withMessage('İsim sadece harflerden oluşmalıdır'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email gereklidir')
    .isEmail().withMessage('Geçerli bir email adresi giriniz')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\+\-\(\)]+$/).withMessage('Geçerli bir telefon numarası giriniz'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Konu 200 karakterden fazla olamaz'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Mesaj gereklidir')
    .isLength({ min: 10, max: 2000 }).withMessage('Mesaj 10-2000 karakter arasında olmalıdır')
    .customSanitizer(value => {
      // XSS protection
      return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }),

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
