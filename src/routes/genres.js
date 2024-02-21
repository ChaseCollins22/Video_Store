const express = require('express');
const validateGenre = require('../validation/genreValidator');
const genreService = require('../services/genreService');
const authMiddlware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const allGenres = await genreService.getGenres();
  return res.json(allGenres);
});

router.get('/:id', async (req, res) => {
  const genre = await genreService.getGenreById(req.params.id);

  if (!genre) return res.status(404).send(`Genre with id: ${req.params.id} could not be found`);

  return res.json(genre);
});

router.post('/', authMiddlware, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.headers);

  const newGenre = await genreService.postGenre({ ...req.body });

  return res.json(newGenre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedGenre = await genreService.updateGenre(req.params.id, req.body);
  if (!updatedGenre) return res.status(404).send('The genre with the given ID was not found.');

  return res.json(updatedGenre);
});

router.delete('/:id', async (req, res) => {
  const deletedGenre = await genreService.deleteGenre(req.params.id);
  if (!deletedGenre) return res.status(404).send('The genre with the given ID was not found.');

  return res.json(deletedGenre);
});

module.exports = router;
