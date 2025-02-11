const express = require('express');
const bookController = require("@controllers/bookController");

const router = express.Router();

router.get('/', bookController.getAllbooks);
router.get('/:id', bookController.getBookById); 
router.post("/", bookController.createBook);
router.put('/:id', bookController.updateBook);

module.exports = router;