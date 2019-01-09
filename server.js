require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');

const authenticate = require('./middleware/authenticate');
const Note = require('./models/NoteModel.js');
const User = require('./models/UserModel.js');

const BCRYPT_COST = process.env.BCRYPT_COST || 11;
const SECRET = process.env.SECRET || 'DevelopmentSecret';

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

server.use(cors(corsOptions));

// SERVE STATIC REACT BUILD AT ROOT ENDPOINT
server.use(express.static(path.join(__dirname, 'client/build')));

server.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is up and running!' });
});

/* AUTH ENDPOINTS */
// Signup a new user
server.post('/signup', async (req, res) => {
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
server.post('/login', async (req, res) => {
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
        return res.json({ token, user: { ...payload } });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error!' });
  }
});

/* NOTES ENDPOINTS */
// Get all notes from all users
server.get('/notes', authenticate, (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) return res.status(500).json('Failed to get notes: ', err);
    return res.status(200).json(notes);
  });
});

// Save new note
server.post('/notes', authenticate, async (req, res) => {
  const { title, description, language, content, createdBy } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: 'You need to enter a title and content!' });
  }

  try {
    // Save new note to Notes collection
    const newNote = new Note({
      title,
      description,
      language,
      content,
      createdBy
    });

    const savedNote = await newNote.save();

    // Add id of new note to Notes array of User model
    const userId = savedNote.createdBy;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { notes: [savedNote.id] } },
      { new: true }
    );
    return res.status(201).json(savedNote);
  } catch (err) {
    return res.status(500).json({ message: 'Error saving note: ', error: err });
  }
});

// Get Note by ID
server.get('/notes/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id).populate('createdBy');
    if (note) return res.status(200).json(note);
    else return res.status(400).json({ message: 'Cannot find note' });
  } catch (err) {
    return res.status(500).json({ message: 'Cannot find note', error: err });
  }
});

// Update Note by ID
server.put('/notes/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    const note = await Note.findByIdAndUpdate(id, update, { new: true });

    if (note)
      return res.status(200).json({
        message: 'Note updated successfully!',
        updatedNote: note
      });
  } catch (err) {
    return res.status(500).json({ message: 'Error finding note', error: err });
  }
});

// Delete note
server.delete('/notes/:id', authenticate, (req, res) => {
  const id = req.params.id;
  Note.findByIdAndRemove(id)
    .lean()
    .then(note => {
      res.status(200).json({
        message: 'Note deleted successfully!',
        deletedNote: note
      });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error Deleting note', error: err })
    );
});

/* USER ENDPOINTS */
// Get user data from JWT token
server.get('/user', authenticate, async (req, res) => {
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
server.put('/user/change-password', authenticate, async (req, res) => {
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
        res.status(200).json(updatedUser);
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!', err });
  }
});

server.put('/user/change-theme', authenticate, async (req, res) => {
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

module.exports = server;
