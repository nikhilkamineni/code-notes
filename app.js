require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');

const PORT = process.env.PORT || 9000;
const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/code-notes';

console.log('\n\n        ##### code-notes #####\n');

// fixes deprecation warnings
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

// Connect to MongoDB
mongoose.connect(
  MONGODB_URL,
  mongooseOptions
);

mongoose.connection.on('error', err =>
  console.log('\u274C Failed to connect to Mongoose!\n', err)
);

mongoose.connection.on('connected', () =>
  console.log('\u2705 Mongoose connection is successful!\n')
);

mongoose.connection.on('disconnected', () =>
  console.log('Mongoose connection is disconnected!')
);

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose connection is disconnected due to application termination!'
    );
    process.exit(0);
  });
});

// Connect to express server
server.listen(PORT, err => {
  if (err) {
    return console.log(`\u274C Server error: ${err}`);
  }
  console.log(`\u2705 Server is listening on port ${PORT}!`);
});
