const express = require('express');
const router = express.Router();
const {createOrder,validateOrder} = require("../controllers/payment")
const authenticateToken = require('../middleware/authMiddleware');

router.post("/order",authenticateToken,createOrder);
  
router.post("/order/validate",authenticateToken,validateOrder);

module.exports = router;