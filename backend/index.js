import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import Book from './models/bookSchema.js'
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

    app.get('/', (req, res) => {
        res.send("Home page")
    })

    app.get('/api/books', async (req, res) => {
        try {
            const books = await Book.find({});
            return res.status(200).json({
                count: books.length, data: books
            });
        } catch (e) {
            logger.error(e.message);
            res.status(500).send({message: e.message});
        }
    });

    app.get('/api/books/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const book = await Book.findById(id);
            return res.status(200).json(book);
        } catch (e) {
            logger.error(e.message);
            res.status(500).send({message: e.message});
        }
    });

    app.post('/api/books', async (req, res) => {
        try {
            if (!req.body.title || !req.body.author || !req.body.publishYear) {
                return res.status(400).send({message: "Send all required fields (title, author, publishYear)"})
            }
            const newBook = {
                title: req.body.title, author: req.body.author, publishYear: req.body.publishYear
            };

            const book = await new Book(newBook);
            await book.save();
            return res.status(201).send(book);

        } catch (e) {
            logger.error(e.message);
            res.status(500).send({message: e.message});
        }
    });

    app.put('/api/books/:id', async (req, res) => {
        try {
            if (!req.body.title || !req.body.author || !req.body.publishYear) {
                return res.status(400).send({message: "Send all required fields (title, author, publishYear)"})
            }
            const {id} = req.params;
            const result = await Book.findByIdAndUpdate(id, req.body);

            if (!result) {
                return res.status(404).json({message: "Book not found"});
            }
            return res.status(200).json({message: "Book updated successfully!"});
        } catch (e) {
            logger.error(e.message);
            res.status(500).send({message: e.message});
        }
    });

    app.delete('/api/books/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const result = await Book.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({message: "Book not found"});
            }
            return res.status(200).send({message: "Book deleted successfully!"});
        } catch (e) {
            logger.error(e.message);
            res.status(500).send({message: e.message});
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

main();
