const Order = require('../models/orders');
const User = require("../models/user"); // Assuming User model is in this path
const Product=require('../models/product');

// Controller for creating an order
const createOrder = async (req, res) => {
    try {
        // Extract data from request body
        const {
            shippingAddress,
            products,
            totalAmount,
            status,
            paymentStatus,
        } = req.body;

        userId=await User.findById(req.user.id);
        // Validate required fields
        if (!userId || !shippingAddress || !products || !totalAmount) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Get the current date for orderDate
        const orderDate = new Date();
        // Add 2 days to the orderDate for the deliveryDate
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(orderDate.getDate() + 2);

        // Create a new order
        const order = new Order({
            userId,
            shippingAddress,
            products,
            totalAmount,
            status: status || 'Pending', // Default status
            paymentStatus: paymentStatus || 'Pending', // Default payment status
            orderDate, // Store the current date as the order date
            deliveryDate, // Optional field
        });

        // Save the order to the database
        const savedOrder = await order.save();

        // Respond with success
        res.status(201).json({ message: 'Order created successfully!', order: savedOrder });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Failed to create order.', error: error.message });
    }
};

// Get order details by userId
const getOrdersByUserId = async (req, res) => {
    try {
        const userId = await User.findById(req.user.id);
        const orders = await Order.find()
        .populate('products')  // Only populate products if they are references
        .exec();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        console.log('Shipping Address:', JSON.stringify(orders[0].shippingAddress, null, 2));
console.log('Products:', JSON.stringify(orders[0].products, null, 2));

        return res.status(200).json(orders); // Return the orders
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const checkStock=async (req, res) => {
    const { products } = req.body; // Array of product IDs and quantities
    try {
        const insufficientStock = [];
        for (const product of products) {
            const productData = await Product.findById(product.id);
            if (productData.stockQuantity < product.quantity) {
                insufficientStock.push(product.name);
            }
        }
        if (insufficientStock.length > 0) {
            return res.status(400).json({ message: "Insufficient stock", insufficientStock });
        }
        res.status(200).json({ message: "Stock available" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateStock=async (req, res) => {
    const { products } = req.body;
    try {
        for (const product of products) {
            await Product.findByIdAndUpdate(
                product.id,
                { $inc: { stockQuantity: -product.quantity } },
                { new: true }
            );
        }
        // Proceed with order creation logic
        const order = new Order(req.body);
        await order.save();
        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = { createOrder,getOrdersByUserId,checkStock,updateStock };
