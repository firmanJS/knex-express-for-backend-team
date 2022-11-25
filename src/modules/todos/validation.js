const { check } = require('express-validator')
const { validateMiddleware } = require('../../middlewares')
const { lang } = require('../../lang')
const { MODEL_PROPERTIES: { TABLES } } = require('../../utils')
const { checkSameValueinDb, checkSameValueinDbUpdate } = require('../../repository/postgres/core_postgres')
/* RULE
  ** More Documentation in here https://express-validator.github.io/docs/
*/
const postValidation = [
  check('name')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'Name' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'Name' }))
    .custom(async (value) => {
      const msg = `Name ${value}`
      const condition = {
        name: value
      }
      await checkSameValueinDb(TABLES.TODO, condition, 'name', lang.__('data.exist', { msg }))
    }),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

const putValidation = [
  check('name')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'Name' }))
    .optional(true)
    .custom(async (value, { req }) => {
      const msg = `Name ${value}`
      await checkSameValueinDbUpdate(TABLES.TODO, { name: value }, 'id', req?.params?.id, lang.__('data.exist', { msg }))
    }),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

module.exports = { postValidation, putValidation }
