const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .required()
    .min(3)
    .max(255)
    .email(),
  password: Joi.string()
    .min(5)
    .max(1024)
    .required(),
});

const validateAuth = (credentials) => schema.validate(credentials);

module.exports = validateAuth;
