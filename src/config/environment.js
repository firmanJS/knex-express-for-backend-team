require('dotenv').config();

module.exports = {
  APP_PORT: process?.env?.APP_PORT ?? 3000,
  APP_ENV: process?.env?.APP_ENV ?? 'development',
  APP_NAME: process?.env?.APP_NAME ?? 'boilerplate-app',
  APP_LIMIT: process?.env?.JSON_LIMIT ?? '12800kb',
  APP_METHOD: process?.env?.APP_METHOD.split(',') ?? ['POST', 'PUT', 'DELETE', 'GET', 'OPTIONS'],
  APP_LANGUAGE: process?.env?.LANGUAGE ?? 'id',
  APP_ALLOW_HEADER: process?.env?.APP_ALLOW_HEADER.split(',') ?? [
    'Origin',
    'Authorization',
    'Content-Type'
  ],
  APP_EXPOSE_HEADER: process?.env?.APP_EXPOSE_HEADER.split(',') ?? ['Content-Length', 'Content-Type'],
  APP_PROTECTION: process?.env?.APP_PROTECTION ?? '1; mode=block;',
  APP_PERMISSION_POLICY: process?.env?.APP_PERMISSION_POLICY ?? 'autoplay=(self), camera=(), encrypted-media=(self), fullscreen=(), geolocation=(self), gyroscope=(self), magnetometer=(), microphone=(), midi=(), payment=(), sync-xhr=(self), usb=()'
};
