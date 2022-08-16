const joi = require('joi');

const productsSchema = joi.object({
  name: joi.string().min(5).required()
    .messages({
      'string.min': '400|Name length must be at least {#limit} characters long',
      'any.required': '422|Name is required',
  }),
});

module.exports = productsSchema;