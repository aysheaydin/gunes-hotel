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

// Verify connection with detailed error handling
transporter.verify((error, success) => {
  if (error) {
    console.log('\n❌ ==================== SMTP CONNECTION ERROR ====================');
    console.log('Error Message:', error.message);
    console.log('Error Code:', error.code);
    console.log('Error Command:', error.command);
    
    // Check specific error types
    if (error.responseCode) {
      console.log('SMTP Response Code:', error.responseCode);
    }
    
    if (error.response) {
      console.log('SMTP Response:', error.response);
    }

    // Common error explanations
    if (error.code === 'EAUTH') {
      console.log('\n🔍 DIAGNOSIS: Authentication Failed');
      console.log('Possible reasons:');
      console.log('  1. Wrong email or password');
      console.log('  2. App password not created or incorrect');
      console.log('  3. Basic authentication disabled (Outlook/Hotmail)');
      console.log('  4. Two-factor authentication not enabled');
      console.log('\n💡 SOLUTION for Outlook:');
      console.log('  - Enable IMAP/SMTP in Outlook settings');
      console.log('  - Wait 15-30 minutes for changes to take effect');
      console.log('  - Or switch to Gmail (faster setup)');
    } else if (error.code === 'ECONNECTION' || error.code === 'ECONNREFUSED') {
      console.log('\n🔍 DIAGNOSIS: Connection Failed');
      console.log('Possible reasons:');
      console.log('  1. Wrong SMTP host or port');
      console.log('  2. Firewall blocking connection');
      console.log('  3. No internet connection');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n🔍 DIAGNOSIS: Connection Timeout');
      console.log('Possible reasons:');
      console.log('  1. SMTP server not responding');
      console.log('  2. Network issues');
    }
    
    // Show current configuration
    console.log('\n📋 CURRENT CONFIGURATION:');
    console.log('  Host:', process.env.EMAIL_HOST);
    console.log('  Port:', process.env.EMAIL_PORT);
    console.log('  Secure:', process.env.EMAIL_SECURE);
    console.log('  User:', process.env.EMAIL_USER);
    console.log('  Password:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) + ' (last 4 chars)' : 'NOT SET');
    
    console.log('\n🔧 TROUBLESHOOTING STEPS:');
    console.log('  1. Check .env file has correct credentials');
    console.log('  2. Verify email provider settings are correct');
    console.log('  3. Try generating a new app password');
    console.log('  4. Consider switching to Gmail for easier setup');
    console.log('===============================================================\n');
    
    logger.error('❌ SMTP connection failed:', error.message);
  } else {
    console.log('\n✅ ==================== SMTP CONNECTION SUCCESS ====================');
    console.log('🎉 SMTP server is ready to send emails!');
    console.log('📧 Configuration:');
    console.log('  Host:', process.env.EMAIL_HOST);
    console.log('  Port:', process.env.EMAIL_PORT);
    console.log('  User:', process.env.EMAIL_USER);
    console.log('  From:', process.env.EMAIL_FROM);
    console.log('===================================================================\n');
    
    logger.info('✅ SMTP server ready to send emails');
  }
});

export default transporter;
