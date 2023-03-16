import { validate } from '../middleware/validation'
import { envSchema } from './config_schema'

export default (env: any) => {
  const { errors, value } = validate(envSchema, env)

  if (errors) {
    console.error(errors)
    process.exit(0)
  }

  return value
}
