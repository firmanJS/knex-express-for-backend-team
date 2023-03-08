import Joi from 'joi'
import configSchema from './config_schema'

const getValidationErrors = (validationErrors: Joi.ValidationErrorItem[]) => {
  const errors: Record<string, string> = {}

  validationErrors.forEach((item) => {
    const { path, message } = item
    const key = path.join('.')
    errors[key] = message
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
export default (env: any) => {
  const { errors, value } = validate(configSchema, env)

  if (errors) {
    console.error(errors)
    process.exit(0)
  }

  return value
}
