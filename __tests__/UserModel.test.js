const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/UserModel.js');

describe('UserModel', () => {
  let connection;
  let db;
  const options = {
    useNewUrlParser: true, // fixes deprecation warnings
    dbName: global.__MONGO_DB_NAME__
  };

  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      options
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let mockUser;
  it('should insert a User into collection', async () => {
    mockUser = await new User({
      username: 'testUser1',
      password: '123456'
    }).save();

    const savedUser = await User.findOne({ username: 'testUser1' });
    expect(savedUser.toJSON()).toEqual(mockUser.toJSON());
    expect(savedUser.password !== '123456');
  });

  it('should succeed when comparing a correct Users password', async () => {
    isMatch = await bcrypt.compare('123456', mockUser.password)
    expect(isMatch).toBe(true)
  })

  it('should fail when comparing an incorrect Users password', async () => {
    isMatch = await bcrypt.compare('113456', mockUser.password)
    expect(isMatch).toBe(false)
  })

  it('should remove a User from collection', async () => {
    const savedUser = await User.findOne({ username: 'testUser1' });
    expect(savedUser.toJSON()).toBeDefined();

    await User.findOneAndRemove({ username: 'testUser1' });
    const deletedUser = await User.findOne({ username: 'testUser1' });
    expect(deletedUser).toBe(null);
  });
});
