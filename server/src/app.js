import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import reservationRoutes from './routes/reservation.js';
import contactRoutes from './routes/contact.js';

// Security imports
import { helmetConfig, additionalSecurityHeaders, enforceHTTPS, disableCache } from './config/helmet.js';
import {
  globalRateLimiter,
  hppProtection,
  suspiciousInputDetection,
  headerValidation,
  requestSizeLimiter,
  ipAccessControl,
  originValidation,
  csrfTokenRoute
} from './middleware/security.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// SECURITY MIDDLEWARE (Order is important!)
// ============================================

// 1. Trust proxy (for correct IP detection behind reverse proxy/load balancer)
app.set('trust proxy', 1);

// 2. HTTPS enforcement (production only)
app.use(enforceHTTPS);

// 3. Security headers (Helmet with comprehensive config)
app.use(helmet(helmetConfig));

// 4. Additional custom security headers
app.use(additionalSecurityHeaders);

// 5. Header validation (prevent header injection)
app.use(headerValidation);

// 6. CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['X-CSRF-Token'],
  maxAge: 600 // 10 minutes
}));

// 7. Body parsers with size limits (DoS prevention)
app.use(express.json(requestSizeLimiter.json));
app.use(express.urlencoded(requestSizeLimiter.urlencoded));

// 8. HTTP Parameter Pollution protection
app.use(hppProtection);

// 9. Response compression
app.use(compression());

// 10. Logging (after body parsing)
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// 11. Global rate limiting (DDoS protection)
app.use(globalRateLimiter);

// 12. IP-based access control
app.use(ipAccessControl);

// 13. Origin validation (CSRF-like protection)
app.use(originValidation);

// 14. Suspicious input detection
app.use(suspiciousInputDetection);

// 15. Disable caching for API routes
app.use('/api', disableCache);

// ============================================
// PUBLIC ROUTES
// ============================================

// Health check (no rate limiting)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// CSRF token endpoint (for client to get token)
app.get('/api/csrf-token', csrfTokenRoute);

// ============================================
// API ROUTES
// ============================================

app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.path} from IP: ${req.ip}`);
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  logger.info(`📧 Email configured for: ${process.env.EMAIL_FROM}`);
  logger.info(`🔒 Security features enabled: Helmet, CORS, Rate Limiting, HPP, Input Sanitization`);
  logger.info(`🛡️ Protection against: XSS, CSRF, DDoS, Injection, Clickjacking, MIME Sniffing`);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

export default app;
