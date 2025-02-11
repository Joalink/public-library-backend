const bookService = require("@services/bookService");

//
async function getAllbooks(req, res) {
  try {
    const books = await bookService.getAllBooks();
    res.json({success:true, data:books});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//
async function getBookById(req, res) {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


async function createBook(req, res) {
  const {id,title, isbn, status} = req.body;
  if (!id || !title || !isbn || !status) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const bookData = {id, title, isbn, status};
  try {    
    const newBook = await bookService.createBook(bookData);
    res.status(201).json({success:true, data:newBook});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function updateBook(req, res){
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    res.json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllbooks, getBookById, createBook, updateBook};