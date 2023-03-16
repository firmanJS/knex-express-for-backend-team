import { check } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import Translate from '../../lang'
import { validateMiddleware } from '../../middleware/validation'
/* RULE
  ** More Documentation in here https://express-validator.github.io/docs/
*/
export const postValidation = [
  check('name')
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'name' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'name' })),
  check('description')
    .optional(true)
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'Deskripsi' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'Deskripsi' })),
  (req: Request, res: Response, next: NextFunction) => { validateMiddleware(req, res, next) }
]

export const putValidation = [
  check('description')
    .optional(true)
    .isString()
    .withMessage(Translate.__('validator.string', { field: 'Deskripsi' }))
    .notEmpty()
    .withMessage(Translate.__('validator.required', { field: 'Deskripsi' })),
  (req: Request, res: Response, next: NextFunction) => { validateMiddleware(req, res, next) }
]

