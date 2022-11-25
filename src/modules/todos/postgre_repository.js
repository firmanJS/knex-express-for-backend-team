const { pgCore } = require('../../config/database')
const Repo = require('../../repository/postgres/core_postgres')
const {
  mappingSuccess, mappingError,
  MODEL_PROPERTIES: { TABLES, CREATED }
} = require('../../utils')
const { lang } = require('../../lang')

const COLUMN = [
  'id', 'name', 'description', ...CREATED
]
const DEFAULT_SORT = [COLUMN[0], 'DESC']
const condition = (builder, where, search) => {
  if (search) {
    builder.where(where).whereILike('name', `%${search}%`).andWhere('deleted_at', null)
  } else {
    builder.where(where)
    builder.andWhere('deleted_at', null)
  }
  return builder
}
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
    const options = { column: COLUMN[0], trx }
    const result = await Repo.insertTrx(TABLES.TODO, payload, options)
    trx.commit()
    return mappingSuccess(lang.__('created.success'), result)
  } catch (error) {
    trx.rollback()
    error.path_filename = __filename
    return mappingError(req, error)
  }
}
/**
 *
 *
 * @param {object} req
 * @param {object} options
 * @param {array} column
 * @return {array of object}
 */
const get = async (req, options, column = COLUMN) => {
  try {
    const result = await pgCore(TABLES.TODO).select(column)
      .where((builder) => {
        condition(builder, options?.where, options?.filter?.search)
      })
      .orderBy(options?.order)
      .limit(options?.filter?.limit)
      .offset(((options.filter.page - 1) * options.filter.limit))

    const [rows] = await pgCore(TABLES.TODO)
      .where((builder) => {
        condition(builder, options?.where, options?.filter?.search)
      })
      .count(column[0])

    return mappingSuccess(lang.__('get.success'), {
      result,
      count: rows?.count
    })
  } catch (error) {
    error.path_filename = __filename
    return mappingError(req, error)
  }
}
/**
 *
 *
 * @param {*} req
 * @param {*} where
 * @param {*} column
 * @return {*}
 */
const getByParam = async (req, options, column = COLUMN) => {
  try {
    options.where.deleted_at = null
    const result = await Repo.fetchByParam(TABLES.TODO, options.where, column)
    if (result) {
      return mappingSuccess(lang.__('get.success'), result)
    }
    return mappingSuccess(lang.__('not.found.id', { id: options.where?.id }), result)
  } catch (error) {
    error.path_filename = __filename
    return mappingError(req, error)
  }
}
/**
 *
 *
 * @param {*} req
 * @param {*} where
 * @param {*} payload
 * @return {*}
 */
const update = async (req, where, payload, name = '') => {
  try {
    let message = ''
    if (payload.type_method === 'update') {
      message = lang.__('updated.success', { id: where?.id })
    } else {
      message = lang.__('archive.success', { id: where?.id })
    }
    const result = await Repo.updated(TABLES.TODO, where, payload, COLUMN[0], name)
    if (result) {
      return mappingSuccess(message, result)
    }
    return mappingSuccess(lang.__('not.found.id', { id: where?.id }), result)
  } catch (error) {
    error.path_filename = __filename
    return mappingError(req, error)
  }
}

module.exports = {
  create,
  get,
  update,
  getByParam,
  COLUMN,
  DEFAULT_SORT
}
