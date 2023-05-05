import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import Translate from '../../lang';
import { validate } from '../../middleware/validation';
import { checkSameValueinDb, checkSameValueinDbUpdate } from '../../models/core';
import { Table } from '../../utils/constant';
/* RULE
 ** More Documentation in here https://express-validator.github.io/docs/
 */
export const postValidation = [
  check('name')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'name' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'name' }))
    .custom(async (value) => {
      const options: Record<string, any> = {
        table: Table.BLOG_CAT,
        where: {
          name: value,
          deleted_at: null
        },
        column: ['name'],
        message: Translate.__('data.exist', { msg: `name ${value}` }),
      };
      await checkSameValueinDb(options);
    }),
  check('description')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'description' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'description' })),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];

export const putValidation = [
  check('name')
    .optional(true)
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'name' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'name' }))
    .custom(async (value, { req }) => {
      const options: Record<string, any> = {
        table: Table.BLOG_CAT,
        where: {
          name: value,
          deleted_at: null
        },
        type: 'uuid',
        column: ['id'],
        name: req?.params?.id,
        message: Translate.__('data.exist', { msg: `name ${value}` }),
      };
      await checkSameValueinDbUpdate(options);
    }),
  check('description')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'description' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'description' })),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];
