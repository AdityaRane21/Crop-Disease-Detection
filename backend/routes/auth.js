const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/registration', async (req, res) => {
  try {
    const {
      firstName, lastName, email, location, phoneNumber,
      farmName, farmSize, farmType, password
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      location,
      phoneNumber,
      farmName,
      farmSize,
      farmType,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

const jwt = require('jsonwebtoken');

// Add this after your registration route in routes/auth.js

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT payload (you can add more user data here if needed)
    const payload = {
      userId: user._id,
      email: user.email,
    };

    // Sign token (replace 'your_jwt_secret' with your actual secret or use env variable)
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    // Send token to client
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
});


module.exports = router;
