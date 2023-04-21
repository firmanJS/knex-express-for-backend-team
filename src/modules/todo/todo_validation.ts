import { NextFunction, Request, Response } from 'express'
import { check } from 'express-validator'
import Translate from '../../lang'
import { validate } from '../../middleware/validation'
import { checkSameValueinDb } from '../../models/core'
import { Table } from '../../utils/constant'
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
        table: Table.TODO,
        where: {
          name: value
        },
        column: ['name'],
        message: Translate.__('data.exist', { msg: `name ${value}` })
      }
      await checkSameValueinDb(options)
    }),
  check('description')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'description' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'description' })),
  (req: Request, res:Response, next:NextFunction) => { validate(req, res, next) }
]
