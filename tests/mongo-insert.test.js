const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__);
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {username: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({username: 'John'});
    expect(insertedUser).toEqual(mockUser);
  });

  it('should insert many docs into collection', async () => {
    const users = db.collection('users');

    const mockUsers = [{username: 'Alice'}, {username: 'Bob'}];
    await users.insertMany(mockUsers);

    const insertedUsers = await users.find().toArray();
    expect(insertedUsers).toEqual([
      expect.objectContaining({username: 'John'}),
      expect.objectContaining({username: 'Alice'}),
      expect.objectContaining({username: 'Bob'})
    ]);
  });
});
