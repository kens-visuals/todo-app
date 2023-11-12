const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = async (req, res) => {
  const { name, email, password, passwordConfirm } = req?.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({ status: 'success', token, data: { user: newUser } });
  } catch (error) {
    console.error('Create User Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
