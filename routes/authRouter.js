const express = require('express')
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/UserModel.js');

const SECRET = process.env.SECRET || 'DevelopmentSecret';

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'API is up and running!' });
});

/* AUTH ENDPOINTS */
// Signup a new user
router.post('/signup', async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(422)
      .json({ message: 'You need to provide a username and password!' });
  }

  try {
    const user = await new User({ username, password }).save();
    return res.status(201).json({ message: 'Successfully created!', user });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating user', error: err });
  }
});

// Login an existing user
router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .json({ error: 'You need to provide a username and password' });
  }

  try {
    username = username.toLowerCase();

    // Find the user object matching the username
    const user = await User.findOne({ username });

    if (user === null)
      return res.status(422).json({ error: 'User does not exist' });

    // Use the method on the User model to hash and check password
    user.checkPassword(password, (nonMatch, hashMatch) => {
      if (nonMatch !== null) {
        return res.status(422).json({ error: 'Incorrect password' });
      }
      if (hashMatch) {
        const payload = {
          username: user.username,
          _id: user._id,
          theme: user.theme
        };
        const token = jwt.sign(payload, SECRET);
        return res.status(200).json({ token, user: { ...payload } });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error!', err });
  }
});

module.exports = router;
