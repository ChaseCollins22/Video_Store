const express = require('express');
const movieService = require('../services/movieService');
const validateMovie = require('../validation/movieValidator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    console.log(movies);
    res.send(movies);
  } catch (error) {
    res.status(500).send('Error retrieving movies');
  }
});

// GET /api/movies/:id
router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  // Logic to fetch movie by ID
  res.send(`Get movie with ID ${movieId}`);
});

router.patch('/:id', async (req, res) => {
  const movieId = req.params.id;
  const movieData = req.body;
  const updatedmovie = await movieService.updateMovie(movieId, movieData);
  // Logic to update movie by ID
  res.send(updatedmovie);
});

// POST /api/movies
router.post('/', async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await movieService.createMovie(req.body);
    res.send(movie);
  } catch (error) {
    res.status(500).send('Error creating movie');
  }
});

// PUT /api/movies/:id
router.put('/:id', async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movieId = req.params.id;
    const updatedmovie = await movieService.updateMovie(movieId, req.body);

    if (!updatedmovie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(updatedmovie);
  } catch (error) {
    res.status(500).send('Error updating movie');
  }
});

// DELETE /api/movies/:id
router.delete('/:id', async (req, res) => {
  const movieId = req.params.id;
  const deletedmovie = await movieService.deleteMovie(movieId);

  if (!deletedmovie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(deletedmovie);
});

module.exports = router;
