const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {userController,cartController,addToCart,removeFromCart,updateCartQuantity} = require("../controllers/user");
const checkoutController=require("../controllers/orders");

// User home route
router.get('/',authenticateToken,userController);

// User cart route
router.get('/cart',authenticateToken,cartController);

//Add to cart
router.post('/add',authenticateToken,addToCart);

//Remove from cart
router.delete('/remove/:productId',authenticateToken,removeFromCart);

// Route to update quantity of an item in the cart
router.post('/update-quantity', authenticateToken, updateCartQuantity);

//Route to checkout
router.get('/checkout',authenticateToken,checkoutController)

module.exports = router;
