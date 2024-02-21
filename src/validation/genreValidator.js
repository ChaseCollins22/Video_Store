const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z\s]+$/, 'only letters')
    .required(),
});

const validateGenre = (genre) => schema.validate(genre);

module.exports = validateGenre;
