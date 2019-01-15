const axiosist = require('axiosist');
const mongoose = require('mongoose');

const Note = require('../models/NoteModel.js');
const server = require('../server.js');

describe('server', () => {
  const options = {
    useNewUrlParser: true, // fixes deprecation warnings
    useFindAndModify: false, // fixes deprecation warnings
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
    const response = await axiosist(server).get('/api/test');
    expect(response.status).toBe(200);
    expect(response.data.message).toEqual('API is up and running!');
  });

  let testUser; // user data for subsequent tests
  describe('/signup [POST]', () => {
    it('should signup a new user successfully', async () => {
      const response = await axiosist(server).post('/api/signup', {
        username: 'testUser',
        password: 'abc123'
      });

      testUser = response.data.user; // save user data here for later tests

      expect(response.status).toBe(201);
      expect(response.data.message).toEqual('Successfully created!');
      expect(response.data.user.username).toEqual('testuser');
      expect(response.data.user._id).toBeDefined();
      expect(response.data.user.theme).toBeDefined();
      expect(response.data.user.notes).toBeDefined();

      expect(response.data.user.username).toEqual(testUser.username);
      expect(response.data.user._id).toEqual(testUser._id);
    });

    it('should fail with missing username', async () => {
      const response = await axiosist(server).post('/api/signup', {
        password: 'abc123'
      });
      expect(response.status).toBe(422);
      expect(response.data.message).toEqual(
        'You need to provide a username and password!'
      );
    });

    it('should fail with missing password', async () => {
      const response = await axiosist(server).post('/api/signup', {
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
      const response = await axiosist(server).post('/api/login', {
        username: 'testUser',
        password: 'abc123'
      });
      testUser.token = response.data.token; // save token for later tests
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
    });

    it('should handle uppercase usernames', async () => {
      const response = await axiosist(server).post('/api/login', {
        username: 'Testuser',
        password: 'abc123'
      });
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
    });

    it('should fail with an incorrect password', async () => {
      const response = await axiosist(server).post('/api/login', {
        username: 'testUser',
        password: 'abc12'
      });
      expect(response.status).toBe(422);
      expect(response.data.token).toBeUndefined();
    });

    it('should fail with an incorrect username', async () => {
      const response = await axiosist(server).post('/api/login', {
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

      const response = await axiosist(server).post('/api/notes', testNote, {
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
      const response = await axiosist(server).post('/api/notes', testNote);

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

      const response = await axiosist(server).post('/api/notes', testNote, {
        headers: { Authorization: token }
      });

      expect(response.status).toBe(401);
    });
  });

  describe('/notes/:id [GET]', () => {
    it('should retrieve the correct note successfully', async () => {
      const response = await axiosist(server).get(
        `/api/notes/${savedTestNote._id}`,
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
        `/api/notes/${savedTestNote._id}`
      );
      expect(response.status).toBe(401);
    });

    it('fails with incorrect token', async () => {
      const token = testUser.token
        .split('')
        .reverse()
        .join('');

      const response = await axiosist(server).get(
        `/api/notes/${savedTestNote._id}`,
        { headers: { Authorization: token } }
      );

      expect(response.status).toBe(401);
    });

    it('fails with incorrect id', async () => {
      const response = await axiosist(server).get(`/api/notes/${testUser._id}`, {
        headers: { Authorization: testUser.token }
      });

      expect(response.status).toBe(400);
    });
  });

  describe('/notes/:id [PUT]', () => {
    it('should update a note correctly', async () => {
      const response = await axiosist(server).put(
        `/api/notes/${savedTestNote._id}`,
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
        `/api/notes/${savedTestNote._id}`,
        {
          content: 'Updated note content',
          language: 'python'
        }
      );

      expect(response.status).toBe(401);
    });

    it('should fail with an invalid token', async () => {
      const token = testUser.token.slice(1);
      const response = await axiosist(server).put(
        `/api/notes/${savedTestNote._id}`,
        {
          content: 'Updated note content',
          language: 'python'
        },
        { headers: { Authorization: token } }
      );

      expect(response.status).toBe(401);
    });
  });

  describe('/notes/:id [DELETE]', () => {
    // Save a note before the test suite runs that each test will attempt to delete
    let noteToDelete;
    beforeAll(async () => {
      const token = testUser.token;

      const response = await axiosist(server).post(
        '/api/notes',
        {
          title: 'Title',
          content: 'Content',
          description: 'Description',
          language: 'javascript',
          createdBy: testUser._id
        },
        {
          headers: { Authorization: token }
        }
      );
      noteToDelete = response.data;
    });

    it('should fail without a token', async () => {
      expect(noteToDelete).toBeDefined();
      const response = await axiosist(server).delete(
        `/api/notes/${noteToDelete._id}`
      );
      expect(response.status).toBe(401);
    });

    it('should fail with an invalid token', async () => {
      expect(noteToDelete).toBeDefined();
      const token = testUser.token.slice(1);
      const response = await axiosist(server).delete(
        `/api/notes/${noteToDelete._id}`,
        { headers: { Authorization: token } }
      );
      expect(response.status).toBe(401);
    });

    it('should delete a note correctly', async () => {
      expect(noteToDelete).toBeDefined();
      const token = testUser.token;
      const response = await axiosist(server).delete(
        `/api/notes/${noteToDelete._id}`,
        { headers: { Authorization: token } }
      );
      expect(response.status).toBe(200);
      expect(response.data.message).toEqual('Note deleted successfully!');
      expect(response.data.deletedNote._id).toEqual(noteToDelete._id);
    });
  });

  /*
   * TEST FOR `/user` ENDPOINTS
   * */
  describe('/user [GET]', () => {
    it('should retrieve a users data successfully', async () => {
      const response = await axiosist(server).get('/api/user', {
        headers: { Authorization: testUser.token }
      });

      expect(response.status).toBe(200);
      expect(response.data.username).toEqual(testUser.username);
      expect(response.data._id).toEqual(testUser._id);
      expect(response.data.notes).toBeDefined();
      expect(response.data.notes.length).toBe(1);
    });
  });

  describe('/user/change-password [PUT]', () => {
    it('should change a users password succesfully', async () => {
      // Attempt to change the users password
      let response = await axiosist(server).put(
        '/api/user/change-password',
        { password: 'def456' },
        {
          headers: { Authorization: testUser.token }
        }
      );
      expect(response.status).toBe(200);
      expect(response.data.message).toEqual('Password was changed successfully!');

      // Attempt to login with the new password to confirm it was changed
      response = await axiosist(server).post('/api/login', { username: 'testUser', password: 'def456' })
      expect(response.status).toBe(200)
      expect(response.data.token).toBeDefined();
    });
  });

  describe('/user/change-theme [PUT]', () => {
    it('should change a users theme successfully', async () => {
      const response = await axiosist(server).put(
        '/api/user/change-theme',
        { theme: 'light' },
        {
          headers: { Authorization: testUser.token }
        }
      );
      expect(response.status).toBe(200);
      expect(response.data.theme).toEqual('light');
    });

    it('should fail without a new theme', async () => {
      const response = await axiosist(server).put(
        '/api/user/change-theme',
        {},
        {
          headers: { Authorization: testUser.token }
        }
      );
      expect(response.status).toBe(400);
    });

    it('should fail without a token', async () => {
      const response = await axiosist(server).put('/api/user/change-theme', {
        theme: 'light'
      });
      expect(response.status).toBe(401);
    });

    it('should fail with an invalid token', async () => {
      const response = await axiosist(server).put(
        '/api/user/change-theme',
        { theme: 'light' },
        {
          headers: { Authorization: testUser.token.slice(1) }
        }
      );
      expect(response.status).toBe(401);
    });
  });
});
