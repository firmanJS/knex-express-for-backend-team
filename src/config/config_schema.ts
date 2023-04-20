import Joi from 'joi'
import { Environment } from '../utils/constant'

export const envSchema = Joi.object({
  APP_LANGUAGE: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  APP_PROTECTION: Joi.string().required(),
  APP_PERMISSION_POLICY: Joi.string().required(),
  APP_METHOD: Joi.string().required(),
  APP_ALLOW_HEADER: Joi.string().required(),
  APP_EXPOSE_HEADER: Joi.string().required(),
  APP_LIMIT: Joi.string().required(),
  APP_ENV: Joi.string()
    .valid(Environment.DEV, Environment.STG, Environment.PROD)
    .default('development'),
  APP_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_DRIVER: Joi.string().required(),
})
