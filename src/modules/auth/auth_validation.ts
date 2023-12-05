import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import Translate from '../../lang';
import { validate } from '../../middleware/validation';
import { checkSameValueinDb } from '../../models/core';
import { Table } from '../../utils/constant';
/* RULE
 ** More Documentation in here https://express-validator.github.io/docs/
 */
export const postValidation = [
  check('username')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'username' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'username' }))
    .custom(async (value) => {
      const options: Record<string, any> = {
        table: Table.USERS,
        where: {
          username: value,
          deleted_at: null
        },
        column: ['username'],
        message: Translate.__('data.exist', { msg: `username ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  check('full_name')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'full_name' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'full_name' }))
    .custom(async (value) => {
      const options: Record<string, any> = {
        table: Table.USERS,
        where: {
          full_name: value,
          deleted_at: null
        },
        column: ['full_name'],
        message: Translate.__('data.exist', { msg: `full_name ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  check('email')
    .isEmail()
    .withMessage(Translate.__('validator.email', { field: 'email' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'email' }))
    .custom(async (value) => {
      const options: Record<string, any> = {
        table: Table.USERS,
        where: {
          email: value,
          deleted_at: null
        },
        column: ['email'],
        message: Translate.__('data.exist', { msg: `email ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  check('password')
    .isLength({ min: 8, max: 12 })
    .withMessage(Translate.__('validator.password.length'))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'password' }))
    .isStrongPassword()
    .withMessage(Translate.__('validator.password')),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  }
];

export const registerValidation = [
  check('username')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'username' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'username' })),
  check('password')
    .isLength({ min: 8, max: 12 })
    .withMessage(Translate.__('validator.password.length'))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'password' }))
    .isStrongPassword()
    .withMessage(Translate.__('validator.password')),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  }
];
