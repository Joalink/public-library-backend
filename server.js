require("dotenv").config();
require("module-alias/register");
const express = require("express");
const booksRouter = require("./routes/api/bookRoutes");
// const booksRouter = require('./routes/api/books');


// const morgan = require('morgan');
const app = express();
app.use(express.json());

app.use("/api/v1/books", booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
