const { pgCore } = require('../../config/database');
const Repo = require('../../repository/postgres/core_postgres');
const {
  mappingSuccess, mappingError,
  MODEL_PROPERTIES: { TABLES, DATE_ONLY }
} = require('../../utils');
const { lang } = require('../../lang');

const COLUMN = [
  'id', 'name', 'email', 'jabatan', ...DATE_ONLY
];
const DEFAULT_SORT = [COLUMN[0], 'DESC'];

module.exports.COLUMN = COLUMN;
module.exports.DEFAULT_SORT = DEFAULT_SORT;
// function cloning
const condition = (builder, where, search) => {
  if (search) {
    builder.where(where).whereILike('name', `%${search}%`).andWhere('deleted_at', null);
    builder.where(where).orWhereILike('email', `%${search}%`).andWhere('deleted_at', null);
    builder.where(where).orWhereILike('jabatan', `%${search}%`).andWhere('deleted_at', null);
  } else {
    builder.where(where);
    builder.andWhere('deleted_at', null);
  }
  return builder;
};

const sql = (where, search = false) => {
  const query = pgCore(TABLES.STAFF)
    .where((builder) => {
      condition(builder, where, search);
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
exports.create = async (req, payload) => {
  const trx = await pgCore.transaction();
  try {
    const result = await Repo.insertTrx({
      table: TABLES.STAFF, payload, column: COLUMN[0], trx
    });
    await trx.commit();
    return mappingSuccess(lang.__('created.success'), result);
  } catch (error) {
    await trx.rollback(error);
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
exports.get = async (req, options, column = COLUMN) => {
  try {
    const result = await sql(options?.where, options?.filter?.search).clone()
      .select(column)
      .orderBy(options?.order)
      .limit(options?.filter?.limit)
      .offset(((options.filter.page - 1) * options.filter.limit));

    const [rows] = await sql(options?.where, options?.filter?.search).clone().count(column[0]);

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
exports.getByParam = async (req, options, column = COLUMN) => {
  try {
    options.where.deleted_at = null;
    const [result] = await Repo.fetchByParam({ table: TABLES.STAFF, where: options.where, column });
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
exports.update = async (req, options) => {
  try {
    let message = '';
    if (options?.type_method === 'update') {
      message = lang.__('updated.success', { id: options?.where?.id });
    } else {
      message = lang.__('archive.success', { id: options?.where?.id });
    }
    const result = await Repo.updated({ table: TABLES.STAFF, column: COLUMN[0], ...options });
    if (result) {
      return mappingSuccess(message, result);
    }
    return mappingSuccess(lang.__('notfound.id', { id: options?.where?.id }), result, 404, false);
  } catch (error) {
    error.path_filename = __filename;
    return mappingError(req, error);
  }
};
