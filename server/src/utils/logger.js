import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(logColors);

/**
 * Sensitive data filter for logs
 * Removes passwords, tokens, and sensitive information
 */
const sanitizeLogs = winston.format((info) => {
  // Sensitive field patterns to redact
  const sensitiveFields = [
    'password', 'token', 'secret', 'apikey', 'authorization',
    'csrf', 'cookie', 'session', 'creditcard', 'ssn', 'api_key'
  ];
  
  // Convert log message to string for searching
  const messageStr = typeof info.message === 'string' 
    ? info.message 
    : JSON.stringify(info.message);
  
  // Check if message contains sensitive data
  let sanitized = messageStr;
  sensitiveFields.forEach(field => {
    // Redact email passwords (common pattern: EMAIL_PASSWORD=...)
    sanitized = sanitized.replace(
      new RegExp(`${field}[=:]\\s*[^\\s,}]+`, 'gi'),
      `${field}=[REDACTED]`
    );
  });
  
  info.message = sanitized;
  return info;
});

const format = winston.format.combine(
  sanitizeLogs(), // Add sensitive data filter FIRST
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/error.log'),
    level: 'error',
  }),
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/all.log'),
  }),
];

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels: logLevels,
  format,
  transports,
});
