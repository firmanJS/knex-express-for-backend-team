import crypto from 'crypto';

namespace Auth {

  export const generatePassword = (payload: Record<string, string> | any)
  : Record<string, string> => {
    try {
      payload.salt = crypto.randomBytes(20).toString('hex');
      const hash = crypto.pbkdf2Sync(payload.password, payload.salt, 10000, 150, 'sha512').toString('hex');
      payload.password = hash;
      return payload;
    } catch (error) {
      console.info('error generated password', error);
      return payload;
    }
  };
}

export = Auth;
