const User = require('../models/user'); // Path to your User model
const bcrypt = require('bcrypt'); // For password comparison

const loginController = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Validate request data
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Email/Phone and password are required.' });
    }

    // Check if the input is an email or phone number
    let user;
    if (emailOrPhone.includes('@')) {
      // It's an email, find by email
      user = await User.findOne({ email: emailOrPhone });
    } else {
      // It's a phone number, find by phone
      user = await User.findOne({ phone: emailOrPhone });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // If login is successful, send a success response
    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { loginController };
