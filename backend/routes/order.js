const express = require('express');
const router = express.Router();
const { createOrder,getOrdersByUserId} = require('../controllers/order');
const authenticateToken = require('../middleware/authMiddleware');

// Route for creating an order
router.post('/create',authenticateToken,createOrder);

// Route to get orders by userId
router.get('/view',authenticateToken ,getOrdersByUserId);

module.exports = router;
