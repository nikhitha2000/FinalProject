const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Function to register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({name: savedUser.name, email: savedUser.email});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Function to log in an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllEmails = async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

module.exports = { registerUser, loginUser, getAllEmails };
