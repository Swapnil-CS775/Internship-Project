const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");  // Import the User model
const Product = require("../models/product"); // Import the product model
const fs = require("fs");
const path = require("path");

// Admin login controller
const adminLoginController = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find the user by email, but only if they are an admin
    const user = await User.findOne({ email, role: "admin" });

    // Check if the user exists and if the password is correct
    if (!user) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Compare the provided password with the hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate a JWT token for the admin
    const token = jwt.sign(
      { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: process.env.JWT_EXPIRES_IN } // Expiration time from .env
    );

    // Set the JWT token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents access to the cookie from JavaScript (mitigates XSS attacks)
      secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
      sameSite: 'Strict', // Helps prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Send the response confirming login success
    res.status(200).json({
      message: "Admin login successful.",
      // Optionally, send some additional information like user info or role
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



// Controller to add a new product
const addProduct = async (req, res) => {
  try {
    // Destructure product details from the request body
    const { name, description, price, category, brand, stockQuantity } = req.body;

    // Check if an image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required." });
    }

    // Validate if all required fields are provided
    if (!name || !description || !price || !category || !brand || !stockQuantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stockQuantity,
      image: req.file.path, // Store the file path of the uploaded image
    });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response
    res.status(201).json({ message: "Product added successfully.", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete product controller
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get product ID from URL parameter

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Get the image path from the product object
    const imagePath = path.join(__dirname, "../", product.image);// Updated path
    console.log("Image Path: ", imagePath); 

    // Delete the image from the server
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res.status(500).json({ message: "Failed to delete image." });
      }
      console.log("Image deleted successfully");
    });

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    // Send success response
    res.status(200).json({ message: "Product and image deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update product controller
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get product ID from URL parameter
    const { name, description, price, category, brand, stockQuantity } = req.body; // Get updated values from request body

    // Construct an object to store updated values
    const updateData = {};

    // Only include the fields that are provided
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category) updateData.category = category;
    if (brand) updateData.brand = brand;
    if (stockQuantity !== undefined) updateData.stockQuantity = stockQuantity;

    // Find the product by ID and update it
    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true } // Return the updated product
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Send success response with updated product details
    res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



module.exports = { adminLoginController,addProduct,deleteProduct, updateProduct };
