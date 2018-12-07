const mongoose = require('mongoose');
const server = require('./server');
require('dotenv').config();

// Connect to MongoDB
mongoose.Promise = global.Promise;

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const options = { useNewUrlParser: true, useCreateIndex: true }; // fixes deprecation warnings

mongoose
  .connect(
    MONGODB_URL,
    options
  )
  .then(() => console.log('\u2705 Successfully connected to MongoDB!\n'))
  .catch(err => console.error('\n\u274C Failed to connect to MongoDB!\n', err));

// Connect to express server
server.listen(PORT, err => {
  if (err) {
    return console.log(`\n\u274C Server error: ${err}\n`);
  }
  console.log(`\n\u2705 Server is listening on port ${process.env.PORT}!`);
});
