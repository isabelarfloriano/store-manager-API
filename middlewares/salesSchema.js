const joi = require('joi');

const salesSchema = joi.object({
  productId: joi.number().required()
    .messages({ 
      'any.required': '400|"productId" is required',
    }),
  quantity: joi.number().min(1).required()
    .messages({
      'number.min': '422|"quantity" must be greater than or equal to {#limit}',
      'any.required': '400|"quantity" is required',
    }),
});

module.exports = salesSchema;