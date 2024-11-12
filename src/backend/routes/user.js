const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Route to create a new user
router.post('/users', async (req, res) => {
  console.log('Received data:', req.body); // Debugging line
  try {
    const { username, email, password} = req.body;

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } 
  catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      res.status(400).json({ message: `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists. Please choose another.` });
    } 
    else
      res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare input password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and success response
    res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
