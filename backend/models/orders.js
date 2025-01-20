const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Reference to the user placing the order
    shippingAddress: {
        type: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                zipCode: { type: String, required: true },
            },
        }, 
        required: true
    }, // User's profile address as billing address
    products: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ], // List of products in the order
    totalAmount: { type: Number, required: true }, // Total cost of the order
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    }, // Current status of the order
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], 
        default: 'Pending' 
    }, // Payment state of the order
    orderId:{type:String,require:true},
    paymentId:{type:String,require:true},
    orderDate: { type: Date, default: Date.now }, // Date when the order was placed
    deliveryDate: { type: Date }, // Expected or actual delivery date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
