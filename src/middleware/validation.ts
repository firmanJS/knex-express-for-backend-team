import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import config from '../config';
import Translate from '../lang';
import { Environment, Http } from '../utils/constant';
import { baseResponse, mappingError } from '../utils/exception';

const checkMessageError = (catchMessage: any, errors: any): string | any => {
  const extractedErrors: string[] = [];
  errors.array().map((err: any) => extractedErrors.push(err.msg));
  const msgList: any = {
    database: Translate.__('knex.db'),
    connect: Translate.__('knex.connect'),
    password: Translate.__('knex.password'),
    select: Translate.__('knex.select'),
    getaddrinfo: Translate.__('knex.host'),
    Please: errors.array()
  };

  return msgList[catchMessage[0][0]] ?? extractedErrors;
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const catchMessage = errors.array().map((err) => err.msg.split(' '));
    if (config?.app?.env === Environment.DEV) {
      console.log('error validate', errors);
    }
    console.log('error validation', errors);
    const message = checkMessageError(catchMessage, errors);
    return baseResponse(
      req,
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
  }
];
