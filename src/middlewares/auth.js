const jwt = require('jsonwebtoken');
const { JWT_ALGORITHM, JWT_SECRET_KEY } = require('../config');
const { HTTP, baseResponse, mappingError } = require('../utils');
const { lang } = require('../lang');

const result = {
  code: HTTP.UNAUTHORIZED,
  data: {
    status: false,
    message: lang.__('validator.required', { field: 'token' }),
    data: []
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) return baseResponse(res, result);
    const token = req?.headers?.authorization.split(' ')[1];
    const credential = jwt.verify(token, JWT_SECRET_KEY, {
      algorithms: JWT_ALGORITHM
    });
    if (credential) {
      req.users_info = credential;
      return next();
    }
    return baseResponse(res, result);
  } catch (error) {
    const err = mappingError(req, error, HTTP.UNAUTHORIZED);
    return baseResponse(res, err);
  }
};
