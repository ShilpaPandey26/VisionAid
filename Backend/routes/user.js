const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming the User model path is correct

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // You could return a token here in case you're using JWT for authentication
    res.json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User Profile
// router.put('/profile', async (req, res) => {
//   const { name, email, phone, location, password, skills, interests } = req.body;

//   try {
//     const user = await User.findOneAndUpdate(
//       { email }, // Assuming email is unique
//       { name, phone, location, password, skills, interests },
//       { new: true }
//     );
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = router;
