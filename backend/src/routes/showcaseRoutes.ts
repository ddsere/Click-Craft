import express from 'express';
import { createShowcase, getShowcaseBySlug } from '../controllers/showcaseController.js';
import { protect, seller } from '../middleware/authMiddleware.js'; // seller එකත් import කළා

const router = express.Router();

router.post('/', protect, seller, createShowcase);

router.get('/:slug', getShowcaseBySlug);

export default router;