const Joi = require('joi')

// Joi for validating our schema.
const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
})
  .with('password', 'repeat_password')

// export schema
module.exports = { registerSchema }
