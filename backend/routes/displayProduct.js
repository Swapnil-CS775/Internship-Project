const Product = require('../models/product'); // Assuming you're using Mongoose for MongoDB

// Get all products from the database
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // If using MongoDB with Mongoose
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

module.exports=getProducts;
