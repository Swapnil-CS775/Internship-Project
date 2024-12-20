const User = require('../models/user'); // Path to the User model

async function registerUser(req,res){
    try {
        // const { firstName, lastName, email, password, phone, address } = req.body;
    
        // Validate request data
        // if (!firstName || !lastName || !email || !password || !phone || !address) {
        //   return res.status(400).json({ message: 'All fields are required.' });
        // }
    
        // Check if the email already exists
        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //   return res.status(400).json({ message: 'Email is already registered.' });
        // }
    
        // Create a new user instance
        const newUser = new User({
          firstName:"omkar",
          lastName:"kadam",
          email:"omkarkadam492@gmail.com",
          password:"omkar23", // Password will be hashed by the pre-save middleware
          phone:9699571452,
          address: {
            street: "vidyanagari",
            city: "baramati",
            state: "maharashtra",
            zipCode: 413133,
          },
        });
    
        // Save the new user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully!' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
}

module.exports = { registerUser };