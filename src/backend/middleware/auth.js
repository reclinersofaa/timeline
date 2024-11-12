const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' prefix
  
  console.log('Received Token:', token); // Log token for debugging
  console.log('JWT_SECRET:', JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log('Decoded Token:', decoded); // Log decoded token for debugging

    // Attach user info to the request object (can be accessed by route handlers)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('JWT Error:', err); // Log any errors for debugging
    return res.status(400).json({ message: 'Invalid token' });
  }
};
