import express from 'express';
import { generateSitemap } from '../controllers/sitemapController.js';

const router = express.Router();

// Sitemap endpoint - no authentication or rate limiting needed for SEO
router.get('/', generateSitemap);

export default router;
