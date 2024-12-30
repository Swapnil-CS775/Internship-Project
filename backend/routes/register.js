const express = require('express');
const router = express.Router();
const {registerController} = require("../controllers/register")

// Register route
router.post('/', registerController);

module.exports = router;
