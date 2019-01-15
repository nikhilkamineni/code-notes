require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');

const authenticate = require('./middleware/authenticate');
const authRouter = require('./routes/authRouter.js')
const userRouter = require('./routes/userRouter.js')
const Note = require('./models/NoteModel.js');
const User = require('./models/UserModel.js');

const BCRYPT_COST = process.env.BCRYPT_COST || 11;

const server = express();
server.use(express.json());
server.use(helmet());

if (process.env.NODE_ENV !== 'test') server.use(morgan('dev'));

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

server.use(cors(corsOptions));

/* CLIENT */
// Serves up the static react build at the root endpoint
server.use(express.static(path.join(__dirname, 'client/build')));

server.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is up and running!' });
});

server.use('/', authRouter)
server.use('/user', userRouter)


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
    return res.status(500).json({ message: 'Error finding note!', error: err });
  }
});

// Delete note
server.delete('/notes/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByIdAndRemove(id).lean();
    if (note)
      return res.status(200).json({
        message: 'Note deleted successfully!',
        deletedNote: note
      });
    else
      return res.status(200).json({
        message: 'Note was not found!'
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error Deleting note!', error: err });
  }
});

module.exports = server;
