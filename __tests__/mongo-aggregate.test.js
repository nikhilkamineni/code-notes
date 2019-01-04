const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;
  const options = { useNewUrlParser: true }; // fixes deprecation warnings

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, options);
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should aggregate docs from collection', async () => {
    const files = db.collection('notes');

    await files.insertMany([
      {title: 'Title for test note 1', description: 'Description for test note 1', content: 'Content for test note 1', createdBy: 'User 1'},
      {title: 'Title for test note 2', description: 'Description for test note 2', content: 'Content for test note 2', createdBy: 'User 1'},
      {title: 'Title for test note 3', description: 'Description for test note 3', content: 'Content for test note 3', createdBy: 'User 1'},
      {title: 'Title for test note 4', description: 'Description for test note 4', content: 'Content for test note 4', createdBy: 'User 1'},
      {title: 'Title for test note 5', description: 'Description for test note 5', content: 'Content for test note 5', createdBy: 'User 2'},
      {title: 'Title for test note 6', description: 'Description for test note 6', content: 'Content for test note 6', createdBy: 'User 2'},
      {title: 'Title for test note 7', description: 'Description for test note 7', content: 'Content for test note 7', createdBy: 'User 2'},
      {title: 'Title for test note 8', description: 'Description for test note 8', content: 'Content for test note 8', createdBy: 'User 3'},
      {title: 'Title for test note 9', description: 'Description for test note 9', content: 'Content for test note 9', createdBy: 'User 3'},
      {title: 'Title for test note 10', description: 'Description for test note 10', content: 'Content for test note 10', createdBy: 'User 4'}
    ]);

    const topFiles = await files
      .aggregate([{$group: {_id: '$createdBy', count: {$sum: 1}}}, {$sort: {count: -1}}])
      .toArray();

    expect(topFiles).toEqual([
      {_id: 'User 1', count: 4},
      {_id: 'User 2', count: 3},
      {_id: 'User 3', count: 2},
      {_id: 'User 4', count: 1}
    ]);
  });
});
