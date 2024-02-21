const express = require('express');

const error = require('../middleware/error');

const homepageRouter = require('../routes/home');
const genresRouter = require('../routes/genres');
const customerRouter = require('../routes/customers');
const movieRouter = require('../routes/movie');
const rentalRouter = require('../routes/rental');
const userRouter = require('../routes/user');
const authRouter = require('../routes/auth');

module.exports = (app) => {
  app.use(express.json());
  app.use('/', homepageRouter);
  app.use('/api/genres', genresRouter);
  app.use('/api/customers', customerRouter);
  app.use('/api/movie', movieRouter);
  app.use('/api/rental', rentalRouter);
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use(error);
};
