import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Http } from '../utils/constant'
import { baseResponse, mappingError } from '../utils/exception'

const getValidationErrors = (validationErrors: Joi.ValidationErrorItem[]) => {
  // const errors: Record<string, string> = {}
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
    console.log(error);

    const extractedErrors: string[] = [];
    error.details.map((err: any) => extractedErrors.push(err.message.replace(/"/g, '')))
    const err = mappingError(req, extractedErrors, Http.UNPROCESSABLE_ENTITY)
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

export {
  validate,
  bodyValidate,
  paramValidate
}
