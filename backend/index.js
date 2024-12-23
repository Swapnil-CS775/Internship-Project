require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const { connectMongoDb } = require("./connection");
const registerRoute = require('./routes/register'); // Path to the register route
const loginRoute = require("./routes/login"); // login route
const logoutRoute = require("./routes/logout"); // logout route
const profileRoute = require("./routes/profile"); // profile route
const resetPasswordRoutes = require('./routes/resetPassword');

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json()); // Use express built-in JSON parser instead of body-parser

// Register Routes
app.use('/register', registerRoute); // Access via /register

// Login Routes
app.use("/login", loginRoute);

// Logout Route
app.use("/logout", logoutRoute);

// Profile Route
app.use("/profile", profileRoute);

//Reset Password Route
app.use('/password-reset', resetPasswordRoutes);

// MongoDB connection
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce"; // Use environment variable for DB URL
connectMongoDb(url);

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
