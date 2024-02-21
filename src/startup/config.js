const morgan = require('morgan');
require('dotenv').config();
const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
  }
};
