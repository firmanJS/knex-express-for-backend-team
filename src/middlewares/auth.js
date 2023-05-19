const jwt = require('jsonwebtoken');
const { JWT_ALGORITHM, JWT_SECRET_KEY } = require('../config');
const { HTTP, baseResponse, mappingError } = require('../utils');
const { lang } = require('../lang');

const validate = (req, res, next) => {
  const token = req?.headers?.authorization.split(' ')[1];
  const credential = jwt.verify(token, JWT_SECRET_KEY, { algorithms: JWT_ALGORITHM });
  if (credential) {
    req.users_info = credential;
    return next();
  }
  const result = {
    code: HTTP.UNAUTHORIZED,
    data: {
      status: false,
      message: lang.__('validator.required', { field: 'token' }),
      data: [],
    }
  };
  return baseResponse(res, result);
};

exports.verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      const result = {
        code: HTTP.UNAUTHORIZED,
        data: {
          status: false,
          message: lang.__('validator.required', { field: 'token' }),
          data: [],
        }
      };
      return baseResponse(res, result);
    }
    return validate(req, res, next);
  } catch (error) {
    const err = mappingError(req, error, HTTP.UNAUTHORIZED);
    return baseResponse(res, err);
  }
};
