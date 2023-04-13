import Joi from 'joi';
import Translate from '../../lang';

const isSad = (value: any) => {
  console.log('value: ', value);
};
export const postValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `{{#label}} ${Translate.__('validator.required')}`
  }).external(isSad),
  description: Joi.string().required().messages({
    'any.required': `{{#label}} ${Translate.__('validator.required')}`
  })
})
