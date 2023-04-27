import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import config from '../config';
import Translate from '../lang';
import { Environment, Http } from '../utils/constant';
import { baseResponse, mappingError } from '../utils/exception';

const checkMessageError = (catchMessage: any, errors: any): string | any => {
  let message;
  const extractedErrors: any = [];
  errors.array().map((err: any) => extractedErrors.push(err.msg));
  switch (catchMessage[0][0]) {
    case 'database':
      message = Translate.__('knex.db');
      break;
    case 'connect':
      message = Translate.__('knex.connect');
      break;
    case 'password':
      message = Translate.__('knex.password');
      break;
    case 'select':
      message = Translate.__('knex.select');
      break;
    case 'getaddrinfo':
      message = Translate.__('knex.host');
      break;
    case 'Please':
      message = errors.array();
      break;
    default:
      message = extractedErrors;
  }

  return message;
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const catchMessage = errors.array().map((err) => err.msg.split(' '));
    if (config?.app?.env === Environment.DEV) {
      console.error('error validate', errors);
    }
    const message = checkMessageError(catchMessage, errors);
    return baseResponse(
      res,
      mappingError(req, message, Http.UNPROCESSABLE_ENTITY)
    );
  }

  return next();
};

export const uuidValidation = [
  param('id')
    .isUUID(4)
    .withMessage(Translate.__('validator.uuid', { field: 'id' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'id' })),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];
