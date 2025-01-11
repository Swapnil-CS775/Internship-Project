const express = require('express');
const router = express.Router();
const { createOrder,getOrdersByUserId,checkStock,updateStock} = require('../controllers/order');
const authenticateToken = require('../middleware/authMiddleware');

// Route for creating an order
router.post('/create',authenticateToken,createOrder);

// Route to get orders by userId
router.get('/view',authenticateToken ,getOrdersByUserId);

// Route to check stock before payment
router.post('/check-stock',authenticateToken ,checkStock);

// Route to update stock after payment
router.post('/update-stock',authenticateToken ,updateStock);

module.exports = router;
