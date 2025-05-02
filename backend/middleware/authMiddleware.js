import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const authMiddleware = async (req, res, next) => {
  // Check for token in the request headers
  const token = req.headers.authorization?.split(" ")[1];

  // If no token, return 401 Unauthorized
  // If token is present, verify it

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by ID from the token payload
    // and exclude the password field from the user object
    req.user = await User.findById(decoded.id).select('-password');

    next();

  } catch (err) {

    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
