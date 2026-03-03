import express from 'express';
import { createReservation } from '../controllers/reservationController.js';
import { validateReservation } from '../middleware/validator.js';
import { reservationLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Create reservation - sends emails to hotel and customer
router.post('/', reservationLimiter, validateReservation, createReservation);

export default router;
