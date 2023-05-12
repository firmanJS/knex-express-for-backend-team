import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config';
import { JwtInterface } from '../interface/entity_interface';

namespace Auth {

  export const generatePassword = (payload: Record<string, string> | any)
  : Record<string, string> => {
    try {
      payload.salt = crypto.randomBytes(20).toString('hex');
      const hash = crypto
        .pbkdf2Sync(payload.password, payload.salt, 10000, 150, 'sha512')
        .toString('hex');
      payload.password = hash;
      return payload;
    } catch (error) {
      console.info('error generated password', error);
      return payload;
    }
  };

  export const isValidPassword = (payload: Record<string, string> | any): boolean => {
    try {
      const hashPassword = crypto
        .pbkdf2Sync(payload?.password, payload?.salt ?? '', 10000, 150, 'sha512').toString('hex');
      return payload?.hash === hashPassword;
    } catch (error) {
      console.info('error validated password', error);
      return false;
    }
  };

  export const setToken = (payload: Record<string, string> | any): JwtInterface => {
    const generateSecret: JwtInterface = {
      access_token: jwt.sign(payload, config.app.secret_key, {
        expiresIn: config.app.jwt_expired,
        algorithm: config.app.algorithm
      }),
      refresh_token: jwt.sign(payload, config.app.secret_key, {
        expiresIn: config.app.refresh_token_expired,
        algorithm: config.app.algorithm
      })
    };

    return generateSecret;
  };
}

export = Auth;
