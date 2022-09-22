const { validationResult } = require('express-validator')
const { mappingError, baseResponse } = require('../utils')
const { lang } = require('../lang')

const checkMessageError = (catchMessage, errors) => {
  let message
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push(err.msg))
  switch (catchMessage[0][0]) {
    case 'database':
      message = lang.__('knex.db')
      break
    case 'connect':
      message = lang.__('knex.connect')
      break
    case 'password':
      message = lang.__('knex.password')
      break
    case 'select':
      message = lang.__('knex.select')
      break
    case 'getaddrinfo':
      message = lang.__('knex.host')
      break
    case 'Please':
      message = errors.array()
      break
    default:
      message = extractedErrors
  }

  return message
}

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const catchMessage = errors.array().map((err) => err.msg.split(' '))
    console.error('error validateMiddleware', errors);
    const message = checkMessageError(catchMessage, errors)
    return baseResponse(res, mappingError(message))
  }

  return next()
}

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true // remove unknown props
};

const joiResult = (schema, property = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[property], options)
  if (error) {
    const extractedErrors = []
    console.error(error.details);
    error.details.map((err) => extractedErrors.push(err.message.replace(/"/g, '')))
    return baseResponse(res, mappingError(extractedErrors))
  }
  // req[property] = value;
  return next()
}

module.exports = {
  validateMiddleware,
  joiResult
}
