// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database
let books = [
    { id: 1, title: 'Pother Pachali', author: 'Humayun Ahmed' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET all books
app.get('/books', (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single book by ID
app.get('/books/:id', (req, res) => {
    try {
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST - Create a new book
app.post('/books', (req, res) => {
    try {
        if (!req.body.title || !req.body.author) {
            return res.status(400).json({ message: 'Title and author are required' });
        }

        const newBook = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author
        };

        books.push(newBook);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update a book
app.put('/books/:id', (req, res) => {
    try {
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Remove a book
app.delete('/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        }

        books = books.filter(b => b.id !== parseInt(req.params.id));
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
