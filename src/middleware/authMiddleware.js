const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Invalid token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth; // now auth is defined
