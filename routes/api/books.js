const express = require('express');
const router = express.Router();
let books = require('../../data/books');

// @route  GET /api/v1/books
// @desc   Get all books
// @access Public
router.get('/', (req, res) => {
  res.json({success:true, data:books});
});

// @route GET /api/v1/books/:id
// @desc Get a single book
// @access Public
router.get('/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  res.json({ success: true, data: book });
});

// @route POST /api/v1/books
// @desc Create a new book
// @access Public
router.post("/", (req, res) => {
  const {title, isbn, status} = req.body;
  if (!title || !isbn || !status) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    isbn,
    status,
  };

  books.push(newBook);
  res.status(201).json({success:true, data:newBook});
});

//@route PUT /api/v1/books/:id
//@desc Update a book
//@access Public
router.put('/:id', (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  const { title, isbn, status } = req.body;

  // Only update fields if they are provided
  if (title !== undefined) book.title = title;
  if (isbn !== undefined) book.isbn = isbn;
  if (status !== undefined) book.status = status;

  res.json({ success: true, data: book });
});

module.exports = router;