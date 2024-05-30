const Joi = require("joi");

function validateRegistrationData(data) {
  const schema = Joi.object({
    userName: Joi.string().required().label("User Name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  });

  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    return error.details.map((err) => err.message);
  }

  return [];
}

module.exports = validateRegistrationData;
