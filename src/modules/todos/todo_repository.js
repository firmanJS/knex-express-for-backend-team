const { pgCore } = require('../../config/database');
const Repo = require('../../repository/postgres/core_postgres');
const {
  mappingSuccess, mappingError,
  MODEL_PROPERTIES: { TABLES, CREATED },
  isSoftDeleted,
  requestOptions
} = require('../../utils');
const { lang } = require('../../lang');

const COLUMN = [
  'id', 'name', 'description', ...CREATED
];
const DEFAULT_SORT = [COLUMN[0], 'DESC'];

const mapOutput = async (options, query) => {
  let result;
  if (options.type === 'array') {
    result = await query;
  } else {
    result = await query.first();
  }
  return result;
};
// function cloning
const condition = (builder, options) => {
  const single = true;
  builder = isSoftDeleted(options.where, builder, single);
  if (options?.filter?.search) {
    builder.whereILike('name', `%${options?.filter?.search}%`);
    builder.andWhere('deleted_at', null);
  }
  return builder;
};

const sql = (options) => {
  const query = pgCore(TABLES.TODO)
    .where((builder) => {
      condition(builder, options);
    });

  return query;
};
// end cloning

/**
 *
 *
 * @param {object} req
 * @param {object} payload
 * @return {object}
 */
const create = async (req, payload) => {
  const trx = await pgCore.transaction();
  try {
    const options = {
      table: TABLES.TODO, payload, column: COLUMN[0], trx
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
const get = async (req, options, column = COLUMN) => {
  try {
    let query = sql(options).clone().select(column);
    query = requestOptions(options, query);
    const result = await mapOutput(options, query);
    const [rows] = await sql(options).clone().count(column[0]);
    return mappingSuccess(lang.__('get.success'), {
      result,
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
const getByParam = async (req, options, column = COLUMN) => {
  try {
    let query = sql(options).clone().select(column);
    query = requestOptions(options, query);
    const result = await mapOutput(options, query);
    if (result) {
      return mappingSuccess(lang.__('get.success'), result);
    }
    return mappingSuccess(lang.__('notfound.id', { id: options.where?.id }), result, 404, false);
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
const update = async (req, options) => {
  try {
    let message = '';
    if (options?.type_method === 'update') {
      message = lang.__('updated.success', { id: options?.where?.id });
    } else {
      message = lang.__('archive.success', { id: options?.where?.id });
    }
    options.table = TABLES.TODO;
    options.column = [COLUMN[1]];
    const result = await Repo.updated(options);
    if (result) return mappingSuccess(message, result);
    return mappingSuccess(lang.__('notfound.id', { id: options?.where?.id }), result, 404, false);
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};

module.exports = {
  create,
  get,
  update,
  getByParam,
  COLUMN,
  DEFAULT_SORT
};
