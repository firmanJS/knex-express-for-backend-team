/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const { pgCore } = require('../../config/database')
const { todayFormat } = require('../../utils')

const format = todayFormat('YYYYMMDDhmmss')

/**
 *
 *
 * @param {*} table
 * @param {*} payload
 * @param {object} options
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
 * @param {object} options
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
  const [result] = await pgCore(table).where(where).select(column)
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
 * @param {array} column
 * @param {object} options
 * @return {*}
 */
const updated = async (table, column, options) => {
  if (options?.type_method === 'soft-delete') {
    const rows = await fetchByParam(table, options?.where, options?.column)
    options.payload.deleted_at = new Date().toISOString()
    if (rows) {
      for (const prop in options?.column) {
        options.payload[options?.column[prop]] = `archived-${format}-${rows[options?.column[prop]]}`
      }
    }
  }
  const [result] = await pgCore(table).where(options?.where).update(options?.payload).returning(column)

  return result
}
/**
 *
 *
 * @param {string} table
 * @param {object} where
 * @param {array} column
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

const checkSameValueinDb = async (table, options) => {
  if (options?.where) {
    const result = await fetchByParam(table, options?.where, [[options?.name]])
    if (result) {
      throw new Error(options?.message)
    }
  }
}

const checkSameValueinDbUpdate = async (table, options) => {
  const result = await fetchByParam(table, options?.where, options?.column)
  const id = result?.[options?.column]
  if (id && +id !== +options.name) {
    throw new Error(options?.message)
  }
}

const checkSameValueinDbUpdateUuid = async (table, options) => {
  const result = await fetchByParam(table, options?.where, options?.column)
  const id = result?.[options?.column]
  if (id && id !== options?.name) {
    throw new Error(options?.message)
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
  insertTrx
}
