require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');
const dbConnect = require('./database');

const PORT = process.env.PORT || 9000;

console.log('\n\n        ##### code-notes #####\n');

dbConnect();

// Connect to express server
server.listen(PORT, err => {
  if (err) return console.log(`\u274C Server error: ${err}`);
  else console.log(`\u2705 Server is listening on port ${PORT}!`);
});
