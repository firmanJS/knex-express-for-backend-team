/* eslint-disable max-len */
const { pgCore } = require('../../config/database')
const { todayFormat } = require('../../utils')
/**
 *
 *
 * @param {*} table
 * @param {*} payload
 * @param {*} options
 * @return {*}
 */
const insert = async (table, payload, options) => {
  const [result] = await pgCore(table).insert(payload).returning(options?.column)
  return result
}
/**
 *
 *
 * @param {*} table
 * @param {*} payload
 * @param {*} options
 * @return {*}
 */
const insertTrx = async (table, payload, options) => {
  const [result] = await pgCore(table).transacting(options?.trx).insert(payload).returning(options?.column)
  return result
}
/**
 *
 *
 * @param {*} table
 * @param {*} where
 * @param {*} column
 * @return {*}
 */
const fetchByParam = async (table, where, column = null) => {
  const model = pgCore(table).where(where)
  const [result] = column !== null ? await model.clone().where(where).select(column) : await model.clone().where(where)
  return result
}

/**
 *
 *
 * @param {*} table
 * @param {*} where
 * @param {*} column
 * @return {*}
 */
const fetchByParamPublic = async (table, where, column, order, limit = 1) => {
  const [result] = await pgCore(table).where(where)
    .select(column).order(order)
    .limit(limit)
  return result
}
/**
 *
 *
 * @param {*} where
 * @param {*} payload
 * @return {*}
 */
const updated = async (table, where, payload, column, name) => {
  if (payload?.type_method === 'soft-delete') {
    const rows = await fetchByParam(table, where, [name])
    const format = todayFormat('YYYYMMDDhmmss')
    if (rows?.[name]) {
      payload[name] = `archived-${format}-${rows[name]}`
    }
  }
  delete payload?.type_method
  const [result] = await pgCore(table).where(where).update(payload).returning(column)

  return result
}
/**
 *
 *
 * @param {*} where
 * @return {*}
 */
const deletePermanently = async (table, where, column) => {
  const [result] = await pgCore(table).where(where).del().returning(column)
  return result
}
/**
 *
 *
 * @param {*} query
 * @return {*}
 */
const raw = async (query) => {
  const result = await pgCore.raw(query)

  return result
}

const checkSameValueinDb = async (table, where, name, message) => {
  if (where) {
    const result = await fetchByParam(table, where, [[name]])
    if (result) {
      throw new Error(message)
    }
  }
}

const checkSameValueinDbUpdate = async (table, where, column, name, message) => {
  const result = await fetchByParam(table, where, column)
  const id = result?.[column]
  if (id && +id !== +name) {
    throw new Error(message)
  }
}

const checkSameValueinDbUpdateUuid = async (table, where, column, name, message) => {
  const result = await fetchByParam(table, where, column)
  const id = result?.[column]
  if (id && id !== name) {
    throw new Error(message)
  }
}

const checkSameValue = async (table, where, column, value, message, flag) => {
  let result = pgCore(table).where(where).count()
  if (flag === 'update') {
    result.whereNot({ [column]: value })
  }
  result = await result;

  if (Number(result[0].count) > 0) {
    throw new Error(message)
  }
}

module.exports = {
  insert,
  updated,
  fetchByParam,
  deletePermanently,
  checkSameValueinDb,
  checkSameValueinDbUpdate,
  checkSameValueinDbUpdateUuid,
  fetchByParamPublic,
  raw,
  checkSameValue,
  insertTrx
}
