const mongoose = require('mongoose');
const { genreSchema } = require('./genreSchema');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
  movieSchema,
  Movie,
};
