const joi = require('joi');

const productsSchema = joi.object({
  name: joi.string().min(5).required()
    .messages({
      'string.min': '422|"name" length must be at least {#limit} characters long',
      'any.required': '400|"name" is required',
  }),
});

module.exports = productsSchema;