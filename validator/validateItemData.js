// validator/validateItemData.js

const Joi = require("joi");

function validateItemData(
  name,
  description,
  startingPrice,
  currentPrice,
  imageUrl,
  endTime
) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    startingPrice: Joi.number().positive().required(),
    currentPrice: Joi.number().optional().min(0),
    imageUrl: Joi.string().optional(),
    endTime: Joi.date().iso().required(),
  });

  const { error } = schema.validate({
    name,
    description,
    startingPrice,
    currentPrice,
    imageUrl,
    endTime,
  });

  return error ? error.details.map((err) => err.message) : [];
}

module.exports = validateItemData;
