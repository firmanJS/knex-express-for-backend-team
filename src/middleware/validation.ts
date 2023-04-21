import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import Translate from '../lang'
import { Constant } from '../utils'
import { baseResponse, mappingError } from '../utils/exception'

const getValidationErrors = (validationErrors: Joi.ValidationErrorItem[]) => {
  const errors: string[] = [];

  validationErrors.forEach((item) => {
    const { message } = item
    errors.push(message)
  })
  return errors
}

const validate = (schema: Joi.Schema, values: any) => {
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

const optionsJoi: Record<string, any> = {
  abortEarly: false,
  stripUnknown: true,
  errors: {
    wrap: {
      label: '',
    },
  },
  cache: true,
}

const errorFunc = (req: Request, res: Response, error:any, next: NextFunction): any => {
  if (error) {
    const extractedErrors: string[] = [];
    error.details.map((err: any) => extractedErrors.push(err.message.replace(/"/g, '')))
    const err = mappingError(req, extractedErrors, Constant.Http.UNPROCESSABLE_ENTITY)
    return baseResponse(res, err)
  }
  return next()
}

const bodyValidate = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req?.body, optionsJoi)

  return errorFunc(req, res, error, next)
}

const paramValidate = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req?.params, optionsJoi)

  return errorFunc(req, res, error, next)
}

const queryValidate = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req?.query, optionsJoi)

  return errorFunc(req, res, error, next)
}

const uuidValidation = Joi.object({
  id: Joi.string().guid({
    version: [
      'uuidv4',
      'uuidv5'
    ]
  }).required().messages({
    'any.required': `{{#label}} ${Translate.__('validator.required')}`,
    'guid.base': `{{#label}} ${Translate.__('validator.required')}`
  }),
})

export {
  validate,
  bodyValidate,
  paramValidate,
  queryValidate,
  uuidValidation,
}
