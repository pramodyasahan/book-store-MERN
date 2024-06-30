import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String, require: true
    }, author: {
        type: String, require: true
    }, publishYear: {
        type: Number, require: true
    },
}, {timestamps: true})

const Book = mongoose.model('Book', bookSchema);
export default Book;