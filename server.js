require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const app = express();
const booksRouter = require("./routes/api/bookRoutes");

// const booksRouter = require('./routes/api/books');
// const morgan = require('morgan');

app.use(
  cors({
    origin: "http://localhost:8081",
    // methods: ["GET", "POST", "PUT", "DELETE"]
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(express.json());

app.use("/api/v1/books", booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
