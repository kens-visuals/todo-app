const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = async (req, res) => {
  const { email, password } = req?.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user._id);

    res.status(200).json({ status: 'success', token });
  } catch (error) {
    console.error('Login User Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
