const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    console.log('No token, authorization denied');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded.user;
    console.log('User from token:', req.user); // Add this line to debug
    next();
  } catch (err) {
    console.log('Token is not valid');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
