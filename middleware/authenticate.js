require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'DevelopmentSecret';

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

module.exports = authenticate;
