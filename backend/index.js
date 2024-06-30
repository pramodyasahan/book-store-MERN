import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import {Book} from './models/bookSchema.js'
import {createLoggerWithChalk} from './logger.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

async function main() {

    const logger = await createLoggerWithChalk();
    logger.info('Logger initialized successfully');

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        logger.info('🟠 - Connected to MongoDB');
    } catch (error) {
        logger.error('❌ - Error connecting to MongoDB: ' + error.message);
    }

    app.get('/', (req, res) => {
        res.send("Home page")
    })

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

main();
