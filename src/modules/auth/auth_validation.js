const { check } = require('express-validator');
const { validateMiddleware } = require('../../middlewares');
const { lang } = require('../../lang');
const {
  MODEL_PROPERTIES: { TABLES }
} = require('../../utils');
const {
  checkSameValueinDb
} = require('../../repository/postgres/core_postgres');
/* RULE
 ** More Documentation in here https://express-validator.github.io/docs/
 */
exports.registerValidation = [
  check('username')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'username' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'username' }))
    .custom(async (value) => {
      const options = {
        where: {
          username: value
        },
        table: TABLES.USERS,
        column: 'username',
        message: lang.__('data.exist', { msg: `username ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  check('email')
    .isEmail()
    .withMessage(lang.__('validator.email'))
    .isString()
    .withMessage(lang.__('validator.string', { field: 'email' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'email' }))
    .custom(async (value) => {
      const options = {
        where: {
          email: value
        },
        table: TABLES.USERS,
        column: 'email',
        message: lang.__('data.exist', { msg: `Email ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  check('full_name')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'email' }))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'email' }))
    .custom(async (value) => {
      const options = {
        where: {
          full_name: value
        },
        table: TABLES.USERS,
        column: 'full_name',
        message: lang.__('data.exist', { msg: `Name ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  check('password')
    .isLength({ min: 8, max: 12 })
    .withMessage(lang.__('validator.password.length'))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'password' }))
    .isStrongPassword()
    .withMessage(lang.__('validator.password')),
  check('password_confirmation')
    .notEmpty()
    .withMessage(
      lang.__('validator.required', { field: 'Password confirmation' })
    )
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(lang.__('validator.password.confirmation'));
      }
      return true;
    }),
  (req, res, next) => {
    validateMiddleware(req, res, next);
  }
];

exports.loginValidation = [
  check('username')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'username atau email' }))
    .notEmpty()
    .withMessage(
      lang.__('validator.required', { field: 'username atau email' })
    ),
  check('password')
    .isLength({ min: 8, max: 12 })
    .withMessage(lang.__('validator.password.length'))
    .notEmpty()
    .withMessage(lang.__('validator.required', { field: 'password' }))
    .isStrongPassword()
    .withMessage(lang.__('validator.password')),
  (req, res, next) => {
    validateMiddleware(req, res, next);
  }
];
