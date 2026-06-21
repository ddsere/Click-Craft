import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import Showcase from '../models/Showcase.js';

export const createShowcase = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { slug, title, theme, items } = req.body;

        const showcaseExists = await Showcase.findOne({ slug });
        if (showcaseExists) {
            return res.status(400).json({ message: "Slug is already taken. Choose another." });
        }

        const showcase = await Showcase.create({
            user: req.user?._id as any,
            slug,
            title,
            theme,
            items
        });

        res.status(201).json(showcase);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const getShowcaseBySlug = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const showcase = await Showcase.findOne({ slug: req.params.slug }).populate('user', 'name businessName email');
        
        if (!showcase) {
            return res.status(404).json({ message: "Showcase not found" });
        }
        res.json(showcase);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};