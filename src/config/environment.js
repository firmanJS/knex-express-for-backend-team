require('dotenv').config();

let CSP = process?.env?.APP_CONTENT_POLICY_DEV;
if (process?.env?.APP_ENV === 'production')
  CSP = process?.env?.APP_CONTENT_POLICY_PROD;
module.exports = {
  APP_TZ: process?.env?.TZ ?? 'Asia/Jakarta',
  APP_PORT: process?.env?.APP_PORT ?? 3000,
  APP_ALGORITHM: process?.env?.PASSWORD_ALGORITHM ?? 'SHA512',
  JWT_EXPIRED: process?.env?.JWT_EXPIRED ?? '8h',
  JWT_SECRET_KEY: process?.env?.APP_SECRET_KEY ?? 'secret-xxxx-xxx',
  JWT_ALGORITHM: process?.env?.JWT_ALGORITHM ?? 'SHA512',
  JWT_REFRESH_TOKEN_EXPIRED: process?.env?.REFRESH_TOKEN_EXPIRED ?? '16h',
  APP_ENV: process?.env?.NODE_ENV ?? 'development',
  APP_DEBUG: process?.env?.APP_DEBUG ?? 1,
  APP_NAME: process?.env?.APP_NAME ?? 'boilerplate-app',
  APP_LIMIT: process?.env?.JSON_LIMIT ?? '12800kb',
  APP_METHOD: ['POST', 'PUT', 'DELETE', 'GET', 'OPTIONS'],
  APP_LANGUAGE: process?.env?.LANGUAGE ?? 'id',
  APP_ALLOW_HEADER: ['Origin', 'Authorization', 'Content-Type'],
  APP_CONTENT_POLICY: CSP,
  APP_EXPOSE_HEADER: ['Content-Length', 'Content-Type'],
  APP_PROTECTION: process?.env?.APP_PROTECTION ?? '1; mode=block;',
  APP_PERMISSION_POLICY:
    process?.env?.APP_PERMISSION_POLICY ??
    'autoplay=(self), camera=(), encrypted-media=(self), fullscreen=(), geolocation=(self), gyroscope=(self), magnetometer=(), microphone=(), midi=(), payment=(), sync-xhr=(self), usb=()'
};
