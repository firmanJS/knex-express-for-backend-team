const { check } = require('express-validator')
const { validateMiddleware } = require('../../middlewares')
const { lang } = require('../../lang')
const { MODEL_PROPERTIES: { TABLES } } = require('../../utils')
const { checkSameValueinDb, checkSameValueinDbUpdateUuid } = require('../../repository/postgres/core_postgres')
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
      const options = {
        where: {
          name: value
        },
        name: 'name',
        message: lang.__('data.exist', { msg: `Name ${value}` })
      }
      await checkSameValueinDb(TABLES.TODO, options)
    }),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

const putValidation = [
  check('name')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'Name' }))
    .optional(true)
    .custom(async (value, { req }) => {
      const options = {
        where: { name: value },
        column: 'id',
        name: req?.params?.id,
        message: lang.__('data.exist', { msg: `Name ${value}` })
      }
      await checkSameValueinDbUpdateUuid(TABLES.TODO, options)
    }),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

module.exports = { postValidation, putValidation }
