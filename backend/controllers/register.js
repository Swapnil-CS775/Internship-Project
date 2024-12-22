const User = require('../models/user'); // Path to the User model
const jwt = require('jsonwebtoken'); // For generating JWT

// Secret key for JWT (use environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // Token expiration (e.g., 7d)

async function registerController(req, res) {
    try {
        const { firstName, lastName, email, password, phone, address } = req.body;

        // Validate request data
        if (!firstName || !lastName || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Check if the phone number already exists
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number is already registered.' });
        }

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password, // Password will be hashed by the pre-save middleware
            phone,
            address,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email, firstName: savedUser.firstName, lastName: savedUser.lastName },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS in production
            sameSite: 'Strict', // Adjust based on your needs (Strict/Lax/None)
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });

        // Respond with success message
        res.status(201).json({ 
            message: 'User registered successfully!',
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                phone: savedUser.phone,
            },
        });

    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: validationErrors.join(', ') });
        }
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { registerController };
