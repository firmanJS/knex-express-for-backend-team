import dotenv from 'dotenv'
import { Config } from './config_interface'
import configValidate from './config_validate'

dotenv.config()

const env = configValidate(process?.env)

const config: Config = {
  app: {
    name: env.APP_NAME,
    env: env.APP_ENV,
    port: env.APP_PORT
  },
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASS,
    name: env.DB_NAME,
  },
}

export default config
