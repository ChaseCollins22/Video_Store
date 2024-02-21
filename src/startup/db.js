const mongoose = require('mongoose');
const winston = require('winston');

const DB_URI = process.env.NODE_ENV === 'test'
  ? 'mongodb://0.0.0.0:27017/VidlyTestDB'
  : 'mongodb://0.0.0.0:27017/VidlyDB';

module.exports = () => {
  mongoose.connect(DB_URI)
    .then(() => winston.info(`Connected to MongoDB at: ${DB_URI}`))
    .catch((err) => winston.error('Could not connect to MongoDB', err));
};
