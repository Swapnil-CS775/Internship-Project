const express = require('express');
const router = express.Router();
const isAdmin=require("../middleware/isAdmin");
const upload = require("../middleware/multerMiddleware");
const {addProduct,deleteProduct, updateProduct,viewOrders,getOrderById} = require("../controllers/admin");

// Protected route to add a product with image upload
router.post("/add", isAdmin, upload.single("image"), addProduct);

// Route to delete a product
// Protected route, only admin can delete a product
router.patch("/delete/:id", isAdmin, deleteProduct);

// Route to update a product
// Protected route, only admin can update a product
router.put("/update/:id", isAdmin, updateProduct);

// Protected route, only admin can view orders
router.get("/orders",isAdmin, viewOrders);

//route to view perticular order
router.get('/getOneOrder/:id',isAdmin,getOrderById)

module.exports = router;