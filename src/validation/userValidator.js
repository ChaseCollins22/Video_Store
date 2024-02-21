const Joi = require('joi');

const userValidator = (user) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
  });

  return schema.validate(user);
};

module.exports = userValidator;
