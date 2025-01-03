const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures that price can't be negative
  },
  category: {
    type: String,
    required: true,
    // enum: ["Resistor", "Capacitor", "Transistor", "Diode", "IC", "Other"], // You can define more categories based on your site
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0, // Ensures that stock can't be negative
  },
  image: {
    type: String,
    required: true  // URL to the image of the product
  },
},{ timestamps: true });


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
