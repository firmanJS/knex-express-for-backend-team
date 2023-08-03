const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET_KEY, JWT_EXPIRED, JWT_ALGORITHM, JWT_REFRESH_TOKEN_EXPIRED, APP_ALGORITHM
} = require('../config');

exports.generatePassword = (payload) => {
  try {
    payload.salt = crypto.randomBytes(20).toString('hex');
    const hash = crypto
      .pbkdf2Sync(payload.password, payload.salt, 10000, 150, APP_ALGORITHM)
      .toString('hex');
    payload.password = hash;
    return payload;
  } catch (error) {
    console.info('error generated password', error);
    return payload;
  }
};

exports.isValidPassword = (payload) => {
  try {
    const hashPassword = crypto
      .pbkdf2Sync(payload?.password, payload?.salt ?? '', 10000, 150, APP_ALGORITHM).toString('hex');
    return payload?.hash === hashPassword;
  } catch (error) {
    console.info('error validated password', error);
    return false;
  }
};

exports.setToken = (payload) => {
  const generateSecret = {
    access_token: jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRED,
      algorithm: JWT_ALGORITHM
    }),
    refresh_token: jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
      algorithm: JWT_ALGORITHM
    })
  };

  return generateSecret;
};
