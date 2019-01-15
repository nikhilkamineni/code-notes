require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');

const authenticate = require('./middleware/authenticate');
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const notesRouter = require('./routes/notesRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());

if (process.env.NODE_ENV !== 'test') server.use(morgan('dev'));

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

server.use(cors(corsOptions));

/* CLIENT */
// Serves up the static react build at the root endpoint
server.use(express.static(path.join(__dirname, 'client/build')));

server.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is up and running!' });
});

// Main routes
server.use('/api', authRouter);
server.use('/api/user', authenticate, userRouter);
server.use('/api/notes', authenticate, notesRouter);

module.exports = server;
