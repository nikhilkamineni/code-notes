const axiosist = require('axiosist');
const mongoose = require('mongoose');

const server = require('../server.js');

describe('server', () => {
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

  it('should pass with flying colors', async () => {
    const response = await axiosist(server).get('/api');
    expect(response.status).toBe(200);
    expect(response.data.message).toEqual('API is up and running!');
  });

  it('should signup a new user successfully', async () => {
    const response = await axiosist(server).post('/signup', { username: 'testUser', password: 'abc123' });
    expect(response.status).toBe(201);
    expect(response.data.message).toEqual('Successfully created!');
    expect(response.data.user.username).toEqual('testuser');
  })
});
