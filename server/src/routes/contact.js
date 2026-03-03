import express from 'express';
import { sendContactMessage } from '../controllers/contactController.js';
import { validateContact } from '../middleware/validator.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', contactLimiter, validateContact, sendContactMessage);

export default router;
