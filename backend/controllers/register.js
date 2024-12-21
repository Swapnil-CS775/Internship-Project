const User = require('../models/user'); // Path to the User model

async function registerController(req,res){
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
          address
        });
    
        // Save the new user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (error) {
        // Check if the error is a validation error from mongoose
        if (error.name === 'ValidationError') {
          const validationErrors = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({ message: validationErrors.join(', ') });
      }
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

module.exports = { registerController };