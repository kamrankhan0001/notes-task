import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  // Check if the request body contains all required fields
  try {

    const { username, email, password } = req.body;

// Check if any of the required fields are missing

    const existingUser = await User.findOne({ email });
// Check if the user already exists in the database
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
// Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);
// Create a new user in the database
    const newUser = await User.create({ username, email, password: hashedPassword });
// Generate a JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id },
       process.env.JWT_SECRET, 
       { expiresIn: '7d' });
// Sign the token with the user's ID and a secret key
// The token will expire in 7 days
// Send a response with the user details and token
    res.status(201).json({ 
      user: { 
      id: newUser._id, 
      username: newUser.username 
      }, token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login function to authenticate users
// This function checks if the user exists and if the password matches
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
// Check if the request body contains all required fields
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
// Check if the user exists in the database
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
// If the password does not match, return an error response
    // If the password matches, generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ user: { id: user._id, username: user.username }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
