import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from "./routes/booksRoute.js";
import {createLoggerWithChalk} from './logger.js';

// Load environment variables from .env file
dotenv.config();

async function main() {

    const logger = await createLoggerWithChalk();
    logger.info('Logger initialized successfully');

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        logger.info('🟠 - Connected to MongoDB');
    } catch (error) {
        logger.error('❌ - Error connecting to MongoDB: ' + error.message);
    }

    const app = express();

    // Middleware for parsing request body
    app.use(express.json());

    // Middleware for handling CORS policy
    app.use(cors({
        origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type'],
    }));

    app.get('/', (req, res) => {
        res.send("Home page")
    });

    app.use('/api/books', booksRoute);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

main();
