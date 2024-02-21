const { Genre } = require('../models/genreSchema');

const getGenres = async () => Genre.find({}).select('name -_id');

const getGenreById = async (id) => {
  try {
    return await Genre.findById(id).select('name -_id');
  } catch (error) {
    console.log(`GET genre by ID error: ${error.message}`);
  }
};
const postGenre = async ({ name }) => {
  try {
    const newGenre = new Genre({ name });
    const result = await newGenre.save();
    console.log('New genre added!: ', result);
    return result;
  } catch (error) {
    console.log(`POST genre error ${error}`);
  }
};

const deleteGenre = async (id) => {
  try {
    const deletedGenre = await Genre.findOneAndDelete({ _id: id });
    console.log('Deleted genre: ', deletedGenre);
    return deletedGenre;
  } catch (error) {
    console.log(error);
  }
};

const updateGenre = async (id, obj) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(id, {
      ...obj,
    }, { new: true });
    console.log(updatedGenre);
    return updatedGenre;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getGenres,
  getGenreById,
  postGenre,
  deleteGenre,
  updateGenre,
};
