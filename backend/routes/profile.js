const express = require('express');
const router = express.Router();
const {profileController} = require("../controllers/profile")
const authenticateToken = require('../middleware/authMiddleware');

// Register route
router.get('/',authenticateToken,profileController);

module.exports = router;
