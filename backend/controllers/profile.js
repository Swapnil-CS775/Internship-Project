const profileController = (req, res) => {
    res.status(200).json({
      message: 'Welcome to Profile',
      user: req.user, // Optionally return user details from the token
    });
  };
  
  module.exports = { profileController };
  