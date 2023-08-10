const { check } = require('express-validator');
const { validateMiddleware } = require('../../middlewares');
const { lang } = require('../../lang');
const { MODEL_PROPERTIES: { TABLES } } = require('../../utils');
const { checkSameValueinDb, checkSameValueinDbUpdateUuid } = require('../../repository/postgres/core_postgres');
/* RULE
  ** More Documentation in here https://express-validator.github.io/docs/
*/
exports.postValidation = [
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
        table: TABLES.TODO,
        name: 'name',
        message: lang.__('data.exist', { msg: `Name ${value}` })
      };
      await checkSameValueinDb(options);
    }),
  (req, res, next) => { validateMiddleware(req, res, next); }
];

exports.putValidation = [
  check('name')
    .isString()
    .withMessage(lang.__('validator.string', { field: 'Name' }))
    .optional(true)
    .custom(async (value, { req }) => {
      const options = {
        where: { name: value },
        column: 'id',
        name: req?.params?.id,
        message: lang.__('data.exist', { msg: `Name ${value}` }),
        table: TABLES.TODO,
      };
      await checkSameValueinDbUpdateUuid(options);
    }),
  (req, res, next) => { validateMiddleware(req, res, next); }
];
