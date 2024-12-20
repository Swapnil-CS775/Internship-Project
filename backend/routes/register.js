const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Path to the User model
const {registerUser} = require("../controllers/register")

// Register route
router.get('/', registerUser);

module.exports = router;
