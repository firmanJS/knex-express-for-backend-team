import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { validationResult } from 'express-validator'
import Translate from '../lang'
import { baseResponse, mappingError } from '../utils/exception'

const getValidationErrors = (validationErrors: Joi.ValidationErrorItem[]) => {
  const errors: Record<string, string> = {}

  validationErrors.forEach((item) => {
    const { path, message } = item
    const key = path.join('.')
    errors[key] = message
  })

  return errors
}


export const validate = (schema: Joi.Schema, values: any) => {
  const { error, value } = schema.validate(values, {
    abortEarly: false,
    stripUnknown: true,
    errors: {
      wrap: {
        label: '',
      },
    },
    cache: true,
  })

  if (!error) {
    return {
      errors: error,
      value,
    }
  }

  return {
    errors: getValidationErrors(error.details),
    value,
  }
}

const checkMessageError = (catchMessage:[string], errors:any) :string => {
  let message
  const extractedErrors: [string] = ['']
  errors.array().map((err: any) => extractedErrors.push(err.msg))
  switch (catchMessage[0][0]) {
    case 'database':
      message = Translate.__('knex.db')
      break
    case 'connect':
      message = Translate.__('knex.connect')
      break
    case 'password':
      message = Translate.__('knex.password')
      break
    case 'select':
      message = Translate.__('knex.select')
      break
    case 'getaddrinfo':
      message = Translate.__('knex.host')
      break
    case 'Please':
      message = errors.array()
      break
    default:
      message = extractedErrors
  }

  return message
}

export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const catchMessage : any = errors.array().map((err) => err.msg.split(' '))
    console.error('error validateMiddleware', errors);
    const message = checkMessageError(catchMessage, errors)
    return baseResponse(res, mappingError(req, message))
  }

  return next()
}

