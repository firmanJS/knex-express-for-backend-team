const { pgCore } = require('../../config/database')
const Repo = require('../../repository/postgres/core_postgres')
const {
  mappingSuccess, mappingError, manipulateDate, mappingSuccessPagination,
  MODEL_PROPERTIES: { TABLES }
} = require('../../utils')
const { lang } = require('../../lang')

const COLUMN = ['id', 'name', 'created_at', 'created_by', 'updated_at', 'updated_by', 'deleted_at', 'deleted_by']
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
 * @param {*} req
 * @param {*} payload
 * @return {*}
 */
const create = async (req, payload) => {
  const trx = await pgCore.transaction();
  try {
    const options = { column:  COLUMN[0], trx, isUpdated: true }
    const result = await Repo.insertTrx(TABLES.COLOR, payload, options)
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
 * @param {*} req
 * @param {*} where
 * @param {*} filter
 * @return {*}
 */
const get = async (req, where, filter, column = COLUMN) => {
  try {
    const result = await pgCore(TABLES.COLOR).select(column)
      .where((builder) => {
        condition(builder, where, filter.search)
      })
      .orderBy(filter.direction, filter.order)
      .limit(filter.limit)
      .offset(((filter.page - 1) * filter.limit))

    const [rows] = await pgCore(TABLES.COLOR)
      .where((builder) => {
        condition(builder, where, filter.search)
      })
      .count(column[0])

    return mappingSuccessPagination(lang.__('get.success'), {
      result: manipulateDate(result),
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
const getByParam = async (req, where, column = COLUMN) => {
  try {
    where.deleted_at = null
    const result = await Repo.fetchByParam(TABLES.COLOR, where, column)
    if (result) {
      return mappingSuccess(lang.__('get.success'), result)
    }
    return mappingSuccess(lang.__('not.found.id', { id: where?.id }), result)
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
    const result = await Repo.updated(TABLES.COLOR, where, payload, COLUMN[0], name)
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
