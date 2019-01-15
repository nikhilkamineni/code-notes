require('dotenv').config();
const bcrypt = require('bcrypt');
const router = require('express').Router();

const authenticate = require('../middleware/authenticate');
const User = require('../models/UserModel.js');

const BCRYPT_COST = process.env.BCRYPT_COST || 11;

/* USER ENDPOINTS */
// Get user data from JWT token
router.get('/', authenticate, async (req, res) => {
  try {
    const username = req.decoded.username;
    const user = await User.findOne({ username })
      .populate('notes')
      .lean();
    res.status(200).json({ ...user });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!', err });
  }
});

// Update a users password
router.put('/change-password', authenticate, async (req, res) => {
  try {
    const _id = req.decoded._id;
    let password = req.body.password;
    let hashedPassword;

    // Hash password here (mongoose doesn't support pre-update hooks)
    await bcrypt.hash(password, 11, async (err, hash) => {
      if (err)
        return res.status(500).json({ message: 'Internal Server Error', err });
      else {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { password: hash },
          { new: true }
        );
        return res
          .status(200)
          .json({
            ...updatedUser,
            message: 'Password was changed successfully!'
          });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error!', err });
  }
});

router.put('/change-theme', authenticate, async (req, res) => {
  try {
    const _id = req.decoded._id;
    const theme = req.body.theme;

    if (!theme)
      return res.status(400).json({ message: 'An updated theme is required!' });
    if (!_id)
      return res
        .status(401)
        .json({ message: 'There was a problem finding the user!' });

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { theme },
      { new: true }
    ).lean();
    delete updatedUser.password;

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
});

module.exports = router;
