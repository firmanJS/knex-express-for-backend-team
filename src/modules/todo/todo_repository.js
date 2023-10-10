const { pgCore } = require('../../config/database');
const Repo = require('../../repository/postgres/core_postgres');
const {
  mappingSuccess,
  mappingError,
  MODEL_PROPERTIES: { TABLES },
  requestOptions,
  mapOutput
} = require('../../utils');
const { lang } = require('../../lang');
const { updateMessageType, manipulateDate } = require('../../utils/manipulate');
const { COLUMN, sql } = require('./todo_schema');
/**
 *
 *
 * @param {object} req
 * @param {object} payload
 * @return {object}
 */
exports.create = async (req, payload) => {
  const trx = await pgCore.transaction();
  try {
    const options = {
      table: TABLES.TODO,
      payload,
      column: COLUMN[0],
      trx
    };
    const result = await Repo.insertTrx(options);
    await trx.commit();
    return mappingSuccess(lang.__('created.success'), result);
  } catch (error) {
    await trx.rollback();
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
/**
 *
 *
 * @param {object} req
 * @param {object} options
 * @param {array} column
 * @return {*}
 */
exports.get = async (req, options, column = COLUMN) => {
  try {
    let query = sql(options).clone().select(column);
    query = requestOptions(options, query);
    const result = await mapOutput(options, query);
    const [rows] = await sql(options).clone().count(column[0]);
    return mappingSuccess(lang.__('get.success'), {
      result: manipulateDate(result),
      count: rows?.count
    });
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
/**
 *
 *
 * @param {object} req
 * @param {object} options
 * @param {array} column
 * @return {object}
 */
exports.getByParam = async (req, options, column = COLUMN) => {
  try {
    let query = sql(options).clone().select(column);
    query = requestOptions(options, query);
    const result = await mapOutput(options, query);
    if (result) {
      return mappingSuccess(
        lang.__('get.success'),
        manipulateDate(result, false)
      );
    }
    return mappingSuccess(
      lang.__('notfound.id', { id: options.where?.id }),
      result,
      404,
      false
    );
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
/**
 *
 *
 * @param {object} req
 * @param {object} options
 * @return {object}
 */
exports.update = async (req, options) => {
  try {
    const message = updateMessageType(options, options?.where?.id);
    options.table = TABLES.TODO;
    options.column = [COLUMN[1]];
    const result = await Repo.updated(options);
    if (result) return mappingSuccess(message, result);
    return mappingSuccess(
      lang.__('notfound.id', { id: options?.where?.id }),
      result,
      404,
      false
    );
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
