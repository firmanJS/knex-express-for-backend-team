import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Http } from '../utils/enum'
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

const bodyValidate = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req?.body, {
    abortEarly: false,
    stripUnknown: true,
    errors: {
      wrap: {
        label: '',
      },
    },
    cache: true,
  })

  if (error) {
    const extractedErrors: string[] = [];
    error.details.map((err) => extractedErrors.push(err.message.replace(/"/g, '')))
    const err = mappingError(req, extractedErrors, Http.UNPROCESSABLE_ENTITY)
    return baseResponse(res, err)
  }
  return next()
}

export {
  validate,
  bodyValidate
}
