const express = require("express");
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register'); // Path to the register route
const loginRoute = require("./routes/login") //login route
const {connectMongoDb} = require("./connection");

const app = express();

// Middleware
app.use(bodyParser.json());

//Register Routes
app.use('/register', registerRoute); // Access via /api/register

//Login Routes
app.use("/login",loginRoute);

// MongoDB connection
const url = "mongodb://localhost:27017/ecommerce";
connectMongoDb(url);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
