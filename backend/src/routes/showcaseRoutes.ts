import express from 'express';
import { createShowcase, getShowcaseBySlug } from '../controllers/showcaseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createShowcase);

router.get('/:slug', getShowcaseBySlug);

export default router;