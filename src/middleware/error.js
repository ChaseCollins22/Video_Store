const winston = require('winston');

const errorLogger = (err, req, res, next) => {
  winston.log('error', err.message, err);

  res.status(500).send('Something failed.');
};

module.exports = errorLogger;
