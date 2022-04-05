// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const { connectDB } = require('../../setup');
// dotenv.config()
const UserModel = require('../../models/User');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    if (global.__MONGO_DB__) {
      db = global.__MONGO_DB__;
    } else {
      db = connectDB();
    }
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
});
