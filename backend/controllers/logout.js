// controllers/logoutController.js

const logoutController = (req, res) => {
    try {
      // Clear the JWT token from cookies
      res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  
      // Send response
      res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
  module.exports = { logoutController };
  