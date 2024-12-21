const express = require('express');
const router = express.Router();
const {loginController} = require("../controllers/login")

// Register route
router.post('/', loginController);

module.exports = router;
