import express from 'express';
import { createReservation } from '../controllers/reservationController.js';
import { validateReservation } from '../middleware/validator.js';
import { reservationLimiter } from '../middleware/rateLimiter.js';
import { emailRateLimiter, phoneRateLimiter, honeypotValidator } from '../middleware/enhancedSecurity.js';

const router = express.Router();

// Create reservation - sends emails to hotel and customer
// Security layers: IP rate limit → Email rate limit → Phone rate limit → Honeypot → Validation
router.post('/', 
  reservationLimiter, 
  emailRateLimiter,
  phoneRateLimiter,
  honeypotValidator,
  validateReservation, 
  createReservation
);

export default router;
