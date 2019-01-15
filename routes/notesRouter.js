require('dotenv').config();
const router = require('express').Router();

const authenticate = require('../middleware/authenticate');
const Note = require('../models/NoteModel.js');
const User = require('../models/UserModel.js');

/* NOTES ENDPOINTS */
// Get all notes from all users
router.get('/', authenticate, (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) return res.status(500).json('Failed to get notes: ', err);
    return res.status(200).json(notes);
  });
});

// Save new note
router.post('/', authenticate, async (req, res) => {
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
router.get('/:id', authenticate, async (req, res) => {
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
router.put('/:id', authenticate, async (req, res) => {
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
router.delete('/:id', authenticate, async (req, res) => {
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

module.exports = router;
