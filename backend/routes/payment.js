const express = require('express');
const router = express.Router();
const {createOrder,validateOrder} = require("../controllers/payment")

router.post("/order",createOrder);
  
router.post("/order/validate",validateOrder);

module.exports = router;