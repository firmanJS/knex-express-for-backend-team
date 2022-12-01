const { check } = require('express-validator')
const { validateMiddleware } = require('../../middlewares')
const { lang } = require('../../lang')
const { MODEL_PROPERTIES: { TABLES }, ENUM } = require('../../utils')
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
      await checkSameValueinDb(TABLES.STAFF, options)
    }),
  check('email')
    .isEmail()
    .withMessage(lang.__('validator.email', { field: 'Email' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'Email' }))
    .custom(async (value) => {
      const options = {
        where: {
          email: value
        },
        name: 'email',
        message: lang.__('data.exist', { msg: `Email ${value}` })
      }
      await checkSameValueinDb(TABLES.STAFF, options)
    }),
  check('jabatan')
    .isIn(ENUM.JABATAN)
    .withMessage(lang.__('validator.enum', { field: 'Jabatan', enum: ENUM.JABATAN.toString() }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'Jabatan' })),
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
      await checkSameValueinDbUpdateUuid(TABLES.STAFF, options)
    }),
  check('email')
    .optional(true)
    .isEmail()
    .withMessage(lang.__('validator.email', { field: 'Email' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'Email' }))
    .custom(async (value, { req }) => {
      const options = {
        where: { email: value },
        column: 'id',
        name: req?.params?.id,
        message: lang.__('data.exist', { msg: `Email ${value}` })
      }
      await checkSameValueinDbUpdateUuid(TABLES.STAFF, options)
    }),
  (req, res, next) => { validateMiddleware(req, res, next) }
]

module.exports = { postValidation, putValidation }
