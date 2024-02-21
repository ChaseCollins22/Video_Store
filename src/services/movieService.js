const { Movie } = require('../models/movieSchema');

// Get all rentals
const getAllMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (error) {
    throw new Error('Failed to get movies');
  }
};

// Get a rental by ID
const getMovieById = async (id) => {
  try {
    const movie = await Movie.findById(id);
    return movie;
  } catch (error) {
    throw new Error('Failed to get movie');
  }
};

// Create a new rental
const createMovie = async (movieData) => {
  try {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
  } catch (error) {
    throw new Error('Failed to create movie');
  }
};

// Update a rental by ID
const updateMovie = async (id, movieData) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $set: movieData },
      { new: true },
    );
    return movie;
  } catch (error) {
    throw new Error('Failed to update movie');
  }
};

// Delete a rental by ID
const deleteMovie = async (id) => {
  try {
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
  } catch (error) {
    throw new Error('Failed to delete movie');
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
