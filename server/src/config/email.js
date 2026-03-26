import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';

// Load environment variables (needed because this file is imported early)
dotenv.config();

// Debug: Check environment variables (Development only - NO sensitive data)
if (process.env.NODE_ENV !== 'production') {
  console.log('📧 EMAIL CONFIG DEBUG:');
  console.log('HOST:', process.env.EMAIL_HOST);
  console.log('PORT:', process.env.EMAIL_PORT);
  console.log('USER:', process.env.EMAIL_USER);
  console.log('PASSWORD:', process.env.EMAIL_PASSWORD ? '***CONFIGURED***' : '***NOT SET***');
}

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
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  debug: process.env.NODE_ENV !== 'production', // Enable debug logs in development only
  logger: process.env.NODE_ENV !== 'production' // Enable logger in development only
});

// Email verification function - to be called at server startup
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('\n✅ ==================== SMTP CONNECTION SUCCESS ====================');
      console.log('🎉 SMTP server is ready to send emails!');
      console.log('📧 Configuration:');
      console.log('  Host:', process.env.EMAIL_HOST);
      console.log('  Port:', process.env.EMAIL_PORT);
      console.log('  User:', process.env.EMAIL_USER);
      console.log('  From:', process.env.EMAIL_FROM);
      console.log('===================================================================\n');
    }
    
    logger.info('✅ SMTP server ready to send emails');
    return true;
  } catch (error) {
    // Log error without sensitive information
    logger.error('❌ SMTP verification failed - emails will not be sent', {
      code: error.code,
      command: error.command
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('\n❌ ==================== SMTP CONNECTION ERROR ====================');
      console.log('Error Code:', error.code);
      console.log('Error Command:', error.command);
    
      // Check specific error types
      if (error.responseCode) {
        console.log('SMTP Response Code:', error.responseCode);
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
    
      console.log('\n🔧 TROUBLESHOOTING STEPS:');
      console.log('  1. Check .env file has correct credentials');
      console.log('  2. Verify email provider settings are correct');
      console.log('  3. Try generating a new app password');
      console.log('  4. Consider switching to Gmail for easier setup');
      console.log('===============================================================\n');
    }
    
    return false;
  }
};

export default transporter;
