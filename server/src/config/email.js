import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Load environment variables
dotenv.config();

// Debug: Check environment variables
console.log('📧 EMAIL CONFIG DEBUG:');
console.log('HOST:', process.env.EMAIL_HOST);
console.log('PORT:', process.env.EMAIL_PORT);
console.log('USER:', process.env.EMAIL_USER);
console.log('PASSWORD:', process.env.EMAIL_PASSWORD ? '***SET***' : '***NOT SET***');

// SMTP Transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ||'smtp-mail.outlook.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  debug: true, // Enable debug logs
  logger: true // Enable logger
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
