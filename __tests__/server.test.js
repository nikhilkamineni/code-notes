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

  let testUser; // user data for subsequent tests
  describe('/signup', () => {
    it('should signup a new user successfully', async () => {
      const response = await axiosist(server).post('/signup', {
        username: 'testUser',
        password: 'abc123'
      });

      testUser = response.data.user; // save user data here for later tests

      expect(response.status).toBe(201);
      expect(response.data.message).toEqual('Successfully created!');
      expect(response.data.user.username).toEqual('testuser');
      expect(response.data.user._id).toBeDefined();

      expect(response.data.user.username).toEqual(testUser.username);
      expect(response.data.user._id).toEqual(testUser._id);
    });

    it('should fail with missing username', async () => {
      const response = await axiosist(server).post('/signup', {
        password: 'abc123'
      });
      expect(response.status).toBe(422);
      expect(response.data.message).toEqual(
        'You need to provide a username and password!'
      );
    });

    it('should fail with missing password', async () => {
      const response = await axiosist(server).post('/signup', {
        username: 'testUser'
      });
      expect(response.status).toBe(422);
      expect(response.data.message).toEqual(
        'You need to provide a username and password!'
      );
    });
  });

  describe('/login', () => {
    it('should login a user Successfully', async () => {
      const response = await axiosist(server).post('/login', {
        username: 'testUser',
        password: 'abc123'
      });
      testUser.token = response.data.token; // save token for later tests
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
    });

    it('should handle uppercase usernames', async () => {
      const response = await axiosist(server).post('/login', {
        username: 'Testuser',
        password: 'abc123'
      });
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
    });

    it('should fail with an incorrect password', async () => {
      const response = await axiosist(server).post('/login', {
        username: 'testUser',
        password: 'abc12'
      });
      expect(response.status).toBe(422);
      expect(response.data.token).toBeUndefined();
    });

    it('should fail with an incorrect username', async () => {
      const response = await axiosist(server).post('/login', {
        username: 'test',
        password: 'abc123'
      });
      expect(response.status).toBe(422);
      expect(response.data.token).toBeUndefined();
    });
  });

  describe('/notes', () => {
    it('should succeed with a token', async () => {
      const testNote = {
        title: 'Test Note Title',
        description: 'Test Note Description',
        language: 'javascript',
        content: 'Test Note Content',
        createdBy: testUser._id
      };

      const token = testUser.token;

      const response = await axiosist(server).post('/notes', testNote, {
        headers: { Authorization: token }
      });

      expect(response.status).toBe(201);
      expect(response.data.title).toEqual(testNote.title);
      expect(response.data.description).toEqual(testNote.description);
      expect(response.data.language).toEqual(testNote.language);
      expect(response.data.content).toEqual(testNote.content);
      expect(response.data.createdBy).toEqual(testNote.createdBy);
    });

    it('should fail without a token', async () => {
      const testNote = {
        title: 'Test Note Title',
        description: 'Test Note Description',
        language: 'javascript',
        content: 'Test Note Content',
        createdBy: testUser._id
      };
      const response = await axiosist(server).post('/notes', testNote);

      expect(response.status).toBe(401);
    });

    it('should fail with an invalid token', async () => {
      const testNote = {
        title: 'Test Note Title',
        description: 'Test Note Description',
        language: 'javascript',
        content: 'Test Note Content',
        createdBy: testUser._id
      };

      const token = testUser.token.split('').reverse().join('')

      const response = await axiosist(server).post('/notes', testNote, {
        headers: { Authorization: token }
      });

      expect(response.status).toBe(401);
    });
  });
});
