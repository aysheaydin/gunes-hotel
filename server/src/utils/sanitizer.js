import validator from 'validator';

/**
 * Security Sanitization Utilities
 * Provides comprehensive input sanitization to prevent:
 * - XSS (Cross-Site Scripting)
 * - Email Header Injection
 * - HTML Injection
 * - Script Injection
 */

/**
 * Sanitize HTML content - removes all HTML tags except safe ones
 * Prevents XSS attacks by escaping dangerous characters
 */
export const sanitizeHtml = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove all HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Escape HTML entities
  sanitized = validator.escape(sanitized);
  
  // Remove any remaining script-like content
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/&lt;script/gi, '')
    .replace(/&lt;iframe/gi, '')
    .replace(/&lt;object/gi, '')
    .replace(/&lt;embed/gi, '');
  
  return sanitized.trim();
};

/**
 * Sanitize for email display (HTML template)
 * More strict - converts special characters to HTML entities
 */
export const sanitizeForEmail = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  // First, remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Escape HTML entities to prevent XSS in email
  return validator.escape(sanitized.trim());
};

/**
 * Validate and sanitize email address
 * Prevents email header injection attacks
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  
  // Remove whitespace
  let sanitized = email.trim().toLowerCase();
  
  // Remove any newline/carriage return characters (email header injection)
  sanitized = sanitized.replace(/[\r\n\t]/g, '');
  
  // Validate email format
  if (!validator.isEmail(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  // Normalize email
  sanitized = validator.normalizeEmail(sanitized);
  
  return sanitized;
};

/**
 * Sanitize phone number - allow only digits and basic separators
 */
export const sanitizePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  
  // Keep only digits and leading +
  // This ensures validation regex will pass
  let sanitized = phone.replace(/[^\d\+]/g, '');
  
  // Ensure + is only at the beginning
  const hasPlus = sanitized.startsWith('+');
  sanitized = sanitized.replace(/\+/g, '');
  
  return (hasPlus ? '+' : '') + sanitized;
};

/**
 * Sanitize name fields - allow only letters and spaces
 * Supports Turkish characters
 */
export const sanitizeName = (name) => {
  if (!name || typeof name !== 'string') return '';
  
  // Remove HTML tags and special characters
  let sanitized = name.replace(/<[^>]*>/g, '');
  
  // Keep only letters (including Turkish) and spaces
  sanitized = sanitized.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/g, '');
  
  // Remove multiple spaces
  sanitized = sanitized.replace(/\s+/g, ' ');
  
  return sanitized.trim();
};

/**
 * Prevent NoSQL injection - sanitize object inputs
 * Even though we don't have a database, this prevents malicious objects
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip properties starting with $ (MongoDB operators)
    if (key.startsWith('$')) continue;
    
    // Recursively sanitize nested objects
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else if (typeof value === 'string') {
      sanitized[key] = validator.escape(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Comprehensive input sanitization for all text fields
 */
export const sanitizeInput = (input, type = 'text') => {
  if (input === null || input === undefined) return '';
  
  switch (type) {
    case 'email':
      return sanitizeEmail(input);
    case 'phone':
      return sanitizePhone(input);
    case 'name':
      return sanitizeName(input);
    case 'html':
      return sanitizeHtml(input);
    case 'emailDisplay':
      return sanitizeForEmail(input);
    default:
      return sanitizeHtml(input);
  }
};

/**
 * Rate limit bypass detection
 * Detects suspicious patterns that might indicate automated attacks
 */
export const detectSuspiciousPatterns = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const suspiciousPatterns = [
    /\{\{.*?\}\}/, // Template injection
    /\$\{.*?\}/, // JavaScript template literals
    /<\?php/i, // PHP code
    /<%.*?%>/, // ASP code
    /eval\s*\(/i, // eval function
    /base64_decode/i, // Base64 decode attempts
    /exec\s*\(/i, // Execution attempts
    /union\s+select/i, // SQL injection
    /script\s*:/i, // Script protocol
    /javascript\s*:/i // JavaScript protocol
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};

/**
 * Security headers validation
 * Ensures request headers don't contain injection attempts
 */
export const validateRequestHeaders = (headers) => {
  const dangerousChars = /[\r\n]/;
  
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === 'string' && dangerousChars.test(value)) {
      throw new Error('Invalid header detected');
    }
  }
  
  return true;
};

export default {
  sanitizeHtml,
  sanitizeForEmail,
  sanitizeEmail,
  sanitizePhone,
  sanitizeName,
  sanitizeObject,
  sanitizeInput,
  detectSuspiciousPatterns,
  validateRequestHeaders
};
