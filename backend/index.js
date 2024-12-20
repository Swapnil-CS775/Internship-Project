const express = require("express");
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register'); // Path to the register route
const {connectMongoDb} = require("./connection");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/register', registerRoute); // Access via /api/register

// MongoDB connection
const url = "mongodb://localhost:27017/ecommerce";
connectMongoDb(url);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
