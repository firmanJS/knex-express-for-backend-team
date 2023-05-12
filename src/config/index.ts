import dotenv from 'dotenv';
import { Config } from './config_interface';

dotenv.config();

const config: Config = {
  app: {
    name: process?.env?.APP_NAME || 'app',
    env: process?.env?.APP_ENV || 'development',
    port: Number(process?.env?.APP_PORT || 2001),
    language: process?.env?.APP_LANGUAGE || 'id',
    permission_policy: process?.env?.APP_PERMISSION_POLICY || '',
    protetcion: process?.env?.APP_PROTECTION || '',
    method: process?.env?.APP_METHOD || '',
    allow_header: process?.env?.APP_ALLOW_HEADER || '',
    expose_header: process?.env?.APP_EXPOSE_HEADER || '',
    limit: process?.env?.APP_LIMIT || '',
    secret_key: process?.env?.APP_SECRET_KEY || '',
    jwt_expired: process?.env?.JWT_EXPIRED || '',
    algorithm: process?.env?.JWT_ALGORITM ?? 'RS256',
    refresh_token_expired: process?.env?.REFRESH_TOKEN_EXPIRED || ''
  },
  db: {
    host: process?.env?.DB_HOST || '',
    port: Number(process?.env?.DB_PORT || 5432),
    username: process?.env?.DB_USER || '',
    password: process?.env?.DB_PASS || '',
    name: process?.env?.DB_NAME || ''
  }
};

export default config;
