import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import Translate from '../lang';
import { Constant, Exception } from '../utils';

const validate = (req: Request | any, res: Response, next: NextFunction) => {
  const token: string | any = req.headers.authorization.split(' ')[1];
  const algorithms: jwt.Algorithm | any = config.app.algorithm;
  const credential: object | any = jwt.verify(token, config.app.secret_key, { algorithms });
  if (credential) {
    req.users_info = credential;
    return next();
  }
  const result: Record<string, string | any> = {
    code: +Constant.Http.UNAUTHORIZED,
    data: {
      status: false,
      message: Translate.__('validator.required', { field: 'token' }),
      data: [],
    }
  };
  return Exception.baseResponse(res, result);
};

export const tokenValidation = (req: Request, res: Response, next: NextFunction): any | void => {
  try {
    if (!req.headers.authorization) {
      const result: Record<string, string | any> = {
        code: +Constant.Http.UNAUTHORIZED,
        data: {
          status: false,
          message: Translate.__('validator.required', { field: 'token' }),
          data: [],
        }
      };
      return Exception.baseResponse(res, result);
    }
    return validate(req, res, next);
  } catch (error:any) {
    const err = Exception.mappingError(req, error, Constant.Http.UNAUTHORIZED);
    return Exception.baseResponse(res, err);
  }
};
