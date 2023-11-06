const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const token = jwt.sign({ userID: 1 }, process.env.SECRET);

    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
};
