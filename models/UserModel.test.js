const mongoose = require('mongoose');
const User = require('./UserModel.js');

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

  it('should insert a User into collection', async () => {
    const mockUser = await new User({
      username: 'testUser1',
      password: '123456'
    }).save();

    const savedUser = await User.findOne({ username: 'testUser1' });
    expect(savedUser.toJSON()).toEqual(mockUser.toJSON());
    expect(savedUser.password !== '123456');
  });

  it('should remove a User from collection', async () => {
    const savedUser = await User.findOne({ username: 'testUser1' });
    expect(savedUser.toJSON()).toBeDefined();

    await User.findOneAndRemove({ username: 'testUser1' });
    const deletedUser = await User.findOne({ username: 'testUser1' });
    expect(deletedUser).toBe(null);
  });
});
