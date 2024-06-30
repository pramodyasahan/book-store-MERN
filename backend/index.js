import express from 'express';
import dotenv from 'dotenv';
import {createLoggerWithChalk} from './logger.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

async function main() {

    const logger = await createLoggerWithChalk();
    logger.info('Logger initialized successfully');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

main();
