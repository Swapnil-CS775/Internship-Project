const express = require('express');
const router = express.Router();
const {logoutController} = require("../controllers/logout")

// Register route
router.post('/', logoutController);

module.exports = router;
