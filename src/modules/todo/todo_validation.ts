import Joi from 'joi'
import Translate from '../../lang'

export const postValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `{{#label}} ${Translate.__('validator.required')}`
  }),
  description: Joi.string().required().messages({
    'any.required': `{{#label}} ${Translate.__('validator.required')}`
  })
})
