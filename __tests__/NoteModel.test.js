const mongoose = require('mongoose');
const User = require('../models/UserModel.js');
const Note = require('../models/NoteModel.js');

describe('NoteModel', () => {
  let testUser;

  beforeAll(async () => {
    const options = {
      useNewUrlParser: true, // fixes deprecation warnings
      dbName: global.__MONGO_DB_NAME__
    };

    await mongoose.connect(
      global.__MONGO_URI__,
      options
    );

    testUser = await new User({
      username: 'noteModelTestUser',
      password: '123456'
    }).save();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let savedNote;

  it('should insert a Note into collection', async () => {
    const newNote = {
      title: 'Title for test note',
      description: 'Description for test note',
      content: 'Content for test note',
      createdBy: testUser._id
    };
    savedNote = await new Note(newNote).save();
    expect(savedNote).toBeDefined();
    expect(savedNote.title).toEqual(newNote.title);
    expect(savedNote.content).toEqual(newNote.content);
    expect(savedNote.description).toEqual(newNote.description);
    expect(savedNote.createdOn).toBeDefined();
    expect(savedNote.createdBy).toEqual(testUser._id);
  });

  it('should remove a Note from collection', async () => {
    const deletedNote = await Note.findOneAndRemove({_id: savedNote._id})
    expect(deletedNote.toJSON()).toEqual(savedNote.toJSON());

    const findNote = await Note.findById(savedNote._id)
    expect(findNote).toBe(null);

  })
});
