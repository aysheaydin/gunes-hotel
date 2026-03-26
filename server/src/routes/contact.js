import express from 'express';
import { sendContactMessage } from '../controllers/contactController.js';
import { validateContact } from '../middleware/validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { emailRateLimiter, honeypotValidator } from '../middleware/enhancedSecurity.js';
import { doubleCsrfProtection } from '../middleware/security.js';

const router = express.Router();

// Contact form - sends email to hotel
// Security layers: IP rate limit → Email rate limit → Honeypot → Validation
router.post('/', 
  doubleCsrfProtection,
  contactLimiter, 
  emailRateLimiter,
  honeypotValidator,
  validateContact, 
  sendContactMessage
);

export default router;
