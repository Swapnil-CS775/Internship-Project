const express = require('express');
const router = express.Router();
const {logoutController} = require("../controllers/logout");
const { compareSync } = require('bcrypt');
const authenticateToken = require('../middleware/authMiddleware');

// Register route
router.post('/',authenticateToken,logoutController);

module.exports = router;
