const Joi = require('joi');

const schemaSales = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().integer().min(1)
    .required(),
});

module.exports = {
  schemaSales,
};