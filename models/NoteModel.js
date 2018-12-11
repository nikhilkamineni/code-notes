const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String,
      required: false
    }
  ],
  color: {
    type: String,
    required: false
  }
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Note', NoteSchema);
