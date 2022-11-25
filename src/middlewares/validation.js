const { validationResult, param } = require('express-validator')
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
    default:
      message = extractedErrors
  }

  return message
}

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const catchMessage = errors.array().map((err) => err.msg.split(' '))
    if (process.env.NODE_ENV === 'development') {
      console.error('error validateMiddleware', errors);
    }
    const message = checkMessageError(catchMessage, errors)
    message.type_error = 'validation'
    return baseResponse(res, mappingError(req, message))
  }

  return next()
}

const idMustBeUuid = [
  param('id')
    .isUUID(4)
    .withMessage(lang.__('validator.uuid', { field: 'id' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'id' })),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

module.exports = {
  validateMiddleware,
  idMustBeUuid
}
