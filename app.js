require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');

const PORT = process.env.PORT || 9000;
const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/code-notes';

console.log('\n\n        ##### code-notes #####\n')

 // fixes deprecation warnings
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// Connect to MongoDB
mongoose
  .connect(
    MONGODB_URL,
    mongooseOptions
  )
  .then(() => console.log('\u2705 Successfully connected to MongoDB!\n'))
  .catch(err => console.error('\u274C Failed to connect to MongoDB!\n', err));

// Connect to express server
server.listen(PORT, err => {
  if (err) {
    return console.log(`\u274C Server error: ${err}`);
  }
  console.log(`\u2705 Server is listening on port ${PORT}!`);
});
