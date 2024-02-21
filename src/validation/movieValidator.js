const Joi = require('joi');

const movieValidator = (movie) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    genre: Joi.object().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate(movie);
};

module.exports = movieValidator;
