const express = require('express');
const router = express.Router();
const isAdmin=require("../middleware/isAdmin");
const upload = require("../middleware/multerMiddleware");
const {adminLoginController,addProduct,deleteProduct, updateProduct } = require("../controllers/admin");

// Protected route to add a product with image upload
router.post("/add", isAdmin, upload.single("image"), addProduct);

// Route to delete a product
// Protected route, only admin can delete a product
router.delete("/delete/:id", isAdmin, deleteProduct);

// Route to update a product
// Protected route, only admin can update a product
router.put("/update/:id", isAdmin, updateProduct);

module.exports = router;