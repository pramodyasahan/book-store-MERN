import Book from "../models/bookSchema.js";
import express from "express";
import {createLoggerWithChalk} from '../logger.js';

const logger = await createLoggerWithChalk();
logger.info('Logger initialized in routes successfully');

const router = express.Router();

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router;