const Joi = require("joi");

module.exports = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).required(),
  email:Joi.string().max(20).custom(validateEmail).required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,30}$/).required()
});