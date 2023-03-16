import dotenv from 'dotenv'
import { Config } from './config_interface'
import configValidate from './config_validate'

dotenv.config()

const env = configValidate(process?.env)

const config: Config = {
  app: {
    name: env.APP_NAME,
    env: env.APP_ENV,
    port: env.APP_PORT,
    language: env.APP_LANGUAGE,
    permission_policy: env.APP_PERMISSION_POLICY,
    protetcion: env.APP_PROTECTION,
    method: env.APP_METHOD,
    allow_header: env.APP_ALLOW_HEADER,
    expose_header: env.APP_EXPOSE_HEADER,
    limit: env.APP_LIMIT
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
