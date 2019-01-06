const mongoose = require('mongoose');

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/code-notes';

// fixes deprecation warnings
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

module.exports = function() {
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
};
