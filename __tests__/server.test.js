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
  describe('/signup [POST]', () => {
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

  describe('/login [POST]', () => {
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

  /* TESTS FOR `/notes` ENDPOINT */
  let savedTestNote;
  describe('/notes [POST]', () => {
    it('should save a note correctly', async () => {
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

      savedTestNote = response.data;
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

      const token = testUser.token
        .split('')
        .reverse()
        .join('');

      const response = await axiosist(server).post('/notes', testNote, {
        headers: { Authorization: token }
      });

      expect(response.status).toBe(401);
    });
  });

  describe('/notes/:id [GET]', () => {
    it('should retrieve the correct note successfully', async () => {
      const response = await axiosist(server).get(
        `/notes/${savedTestNote._id}`,
        { headers: { Authorization: testUser.token } }
      );
      expect(response.status).toBe(200);
      expect(response.data.title).toEqual(savedTestNote.title);
      expect(response.data.description).toEqual(savedTestNote.description);
      expect(response.data.language).toEqual(savedTestNote.language);
      expect(response.data.content).toEqual(savedTestNote.content);
      expect(response.data.id).toEqual(savedTestNote.id);
      expect(response.data.createdBy._id).toEqual(testUser._id);
    });

    it('fails with missing token', async () => {
      const response = await axiosist(server).get(
        `/notes/${savedTestNote._id}`
      );
      expect(response.status).toBe(401);
    });

    it('fails with incorrect token', async () => {
      const token = testUser.token
        .split('')
        .reverse()
        .join('');

      const response = await axiosist(server).get(
        `/notes/${savedTestNote._id}`,
        { headers: { Authorization: token } }
      );

      expect(response.status).toBe(401);
    });

    it('fails with incorrect id', async () => {
      const response = await axiosist(server).get(`/notes/${testUser._id}`, {
        headers: { Authorization: testUser.token }
      });

      expect(response.status).toBe(400);
    });
  });

  describe('/notes/:id [PUT]', () => {
    it('should update a note correctly', async () => {
      const response = await axiosist(server).put(
        `/notes/${savedTestNote._id}`,
        {
          content: 'Updated note content',
          language: 'python'
        },
        { headers: { Authorization: testUser.token }, new: true }
      );

      expect(response.status).toBe(200);
      expect(response.data.updatedNote.language).toEqual('python');
      expect(response.data.updatedNote.content).toEqual('Updated note content');
    });

    it('should fail without a token', async () => {
      const response = await axiosist(server).put(
        `/notes/${savedTestNote._id}`,
        {
          content: 'Updated note content',
          language: 'python'
        }
      );

      expect(response.status).toBe(401);
    });

    it('should fail with an invalid token', async () => {
      const token = testUser.token.slice(1)
      const response = await axiosist(server).put(
        `/notes/${savedTestNote._id}`,
        {
          content: 'Updated note content',
          language: 'python'
        },
        { headers: { Authorization: token } }
      );

      expect(response.status).toBe(401);
    });

  });

  // describe('/notes/:id [DELETE]', () => {
  // })
});
