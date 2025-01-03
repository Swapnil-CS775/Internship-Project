const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  console.log("req came at middleware");
  // Extract token from the cookie
  const token = req.cookies.token;
  console.log("received token : ",token);
  // If token doesn't exist, return an error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If there's an error in verifying the token (invalid or expired)
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    console.log("token verification success.")
    // Attach the decoded user info to the request object
    req.user = user;
     
    // Pass control to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
