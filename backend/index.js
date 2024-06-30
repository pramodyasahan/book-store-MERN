import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import cors from 'cors'
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

    // middleware for parsing request body
    app.use(express.json());

    // middleware for handling CORS POLICY
    app.use(cors());
    app.use(cors({
        origin: 'http://localhost:3000',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['content-type'],
    }));

    app.get('/', (req, res) => {
        res.send("Home page")
    })

    app.use('/api/books', booksRoute);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

main();
