const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && req.headers.authorization.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};
