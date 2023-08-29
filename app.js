//importing express
const express = require('express');
const app = express();
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`Received a ${req.method} request to ${req.url}`);
    next();
});


// example database
let books = [{
        id: 1,
        title: '1984',
        author: 'George Orwell'
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee'
    },
    {
        id: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
    }
];


// list all books
app.get('/books', (req, res) => {
    res.json(books);
});

// gets a book by id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');
    res.json(book);
});

// create a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

//delete a book
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found.');

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.json(book);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// -X POST -H "Content-Type: application/json" -d '{"title": "New Book", "author": "New Author"}