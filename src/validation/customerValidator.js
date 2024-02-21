const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z- ]+$/, 'only letters')
    .required(),
  isGold: Joi.boolean(),
  phone: Joi.string()
    .min(12)
    .max(12)
    .pattern(/^\d{3}-\d{3}-\d{4}$/, 'phone number format: XXX-XXX-XXXX')
    .required(),
});

const validateCustomer = (customer) => schema.validate(customer);

module.exports = validateCustomer;
