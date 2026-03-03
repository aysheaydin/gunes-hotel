import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

// SMTP Transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    logger.error('❌ SMTP connection failed:', error.message);
  } else {
    logger.info('✅ SMTP server ready to send emails');
  }
});

export default transporter;
