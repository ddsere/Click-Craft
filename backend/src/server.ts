import express, { Application, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import showcaseRoutes from './routes/showcaseRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/showcases', showcaseRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "ClickCraft TypeScript Backend Running Successfully!" });
});

app.listen(PORT, () => {
    console.log(`🚀 RAD Backend Server running on port ${PORT}`);
});