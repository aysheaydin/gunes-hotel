/**
 * Environment Detection Utilities
 * 
 * Vite provides environment variables through import.meta.env
 * This centralizes all environment checks for consistency
 * 
 * @see https://vitejs.dev/guide/env-and-mode.html
 */

// Boolean flags for environment detection
export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

// Mode string (development, production, test, etc.)
export const mode = import.meta.env.MODE;

// Base URL for the app
export const baseUrl = import.meta.env.BASE_URL;

/**
 * Check if running in SSR mode
 * @returns {boolean}
 */
export const isSSR = import.meta.env.SSR;
