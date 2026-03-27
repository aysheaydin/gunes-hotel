/**
 * Environment Variable Validator
 * Validates all required environment variables at startup
 */

import { logger } from './logger.js';

const validationRules = {
  NODE_ENV: {
    required: true,
    allowedValues: ['development', 'production', 'test'],
    default: 'development'
  },
  PORT: {
    required: false,
    type: 'number',
    default: 5000,
    validator: (val) => val > 0 && val < 65536
  },
  EMAIL_HOST: {
    required: true,
    validator: (val) => /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(val)
  },
  EMAIL_PORT: {
    required: true,
    type: 'number',
    allowedValues: [25, 465, 587, 2525]
  },
  EMAIL_USER: {
    required: true,
    validator: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  },
  EMAIL_PASSWORD: {
    required: true,
    minLength: 8,
    validator: (val) => {
      // Must not be a common password
      const commonPasswords = ['password', '12345678', 'admin', 'qwerty'];
      return !commonPasswords.includes(val.toLowerCase());
    }
  },
  EMAIL_FROM: {
    required: true,
    validator: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  },
  CONTACT_EMAIL: {
    required: true,
    validator: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  },
  CSRF_SECRET: {
    required: true,
    minLength: 32,
    // Should be base64 or hex encoded secret
    validator: (val) => /^[A-Za-z0-9+/=]{32,}$/.test(val) || /^[A-Fa-f0-9]{32,}$/.test(val)
  },
  CORS_ORIGIN: {
    required: false,
    validator: (val) => {
      if (!val) return true;
      const origins = val.split(',').map(o => o.trim());
      return origins.every(origin => {
        try {
          const url = new URL(origin);
          return url.protocol === 'https:' || process.env.NODE_ENV !== 'production';
        } catch {
          return false;
        }
      });
    }
  }
};

/**
 * Validate environment variables
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateEnvironment() {
  const errors = [];
  const warnings = [];

  for (const [key, rules] of Object.entries(validationRules)) {
    let value = process.env[key];

    // Check required
    if (rules.required && !value) {
      if (rules.default !== undefined) {
        process.env[key] = String(rules.default);
        warnings.push(`${key} not set, using default: ${rules.default}`);
        value = String(rules.default);
      } else {
        errors.push(`${key} is required but not set`);
        continue;
      }
    }

    if (!value) continue; // Skip optional vars that aren't set

    // Type validation
    if (rules.type === 'number') {
      const num = Number(value);
      if (isNaN(num)) {
        errors.push(`${key} must be a number, got: ${value}`);
        continue;
      }
      value = num;
    }

    // Allowed values
    if (rules.allowedValues && !rules.allowedValues.includes(value)) {
      errors.push(`${key} must be one of: ${rules.allowedValues.join(', ')}, got: ${value}`);
    }

    // Min length
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${key} must be at least ${rules.minLength} characters, got ${value.length}`);
    }

    // Custom validator
    if (rules.validator && !rules.validator(value)) {
      errors.push(`${key} failed validation`);
    }
  }

  // Security checks for production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.CORS_ORIGIN) {
      warnings.push('CORS_ORIGIN not set in production - will use default domain only');
    }

    if (process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD.length < 16) {
      warnings.push('EMAIL_PASSWORD is weak - consider using a stronger app-specific password');
    }

    if (process.env.CSRF_SECRET && process.env.CSRF_SECRET.length < 32) {
      errors.push('CSRF_SECRET must be at least 32 characters in production');
    }
  }

  // Log results
  if (warnings.length > 0) {
    warnings.forEach(w => logger.warn(`⚠️  ${w}`));
  }

  if (errors.length > 0) {
    logger.error('❌ Environment validation failed:');
    errors.forEach(e => logger.error(`   - ${e}`));
    return { valid: false, errors };
  }

  logger.info('✅ Environment validation passed');
  return { valid: true, errors: [] };
}

/**
 * Validate and exit if validation fails
 */
export function validateEnvironmentOrExit() {
  const result = validateEnvironment();
  
  if (!result.valid) {
    logger.error('Please check your .env file and fix the above errors.');
    logger.error('Server cannot start with invalid configuration.');
    process.exit(1);
  }
  
  return result;
}

export default { validateEnvironment, validateEnvironmentOrExit };
