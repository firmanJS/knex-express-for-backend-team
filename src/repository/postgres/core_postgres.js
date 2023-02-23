/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const { pgCore } = require('../../config/database')
const { todayFormat } = require('../../utils')

const format = todayFormat('YYYYMMDDhmmss')

/**
 *
 * @param {object} options
 * @return {*}
 */
exports.insert = async (options) => {
  const [result] = await pgCore(options?.table).insert(options?.payload).returning(options?.column)
  return result
}
/**
 *
 * @param {object} options
 * @return {*}
 */
exports.insertTrx = async (options) => {
  const [result] = await pgCore(options?.table).transacting(options?.trx).insert(options?.payload)
    .returning(options?.column)
  return result
}
/**
 *
 * @param {object} options
 * @return {*}
 */
const fetchByParam = async (options) => {
  const result = await pgCore(options?.table).where(options?.where).select(options?.column)
  return result
}
/**
 *
 * @param {object} options
 * @return {*}
 */
exports.updated = async (options) => {
  const loop = (rows) => {
    options.payload.deleted_at = new Date().toISOString()
    for (const prop in options?.column) {
      options.payload[options?.column[prop]] = `archived-${format}-${rows[options?.column[prop]]}`
    }

    return options
  }

  if (options?.type_method === 'soft-delete') {
    const [rows] = await fetchByParam(options)
    options.payload.deleted_at = new Date().toISOString()
    if (rows) {
      loop(rows, options)
    }
  }

  const [result] = await pgCore(options?.table).where(options?.where).update(options?.payload).returning(options?.column)

  return result
}
/**
 *
 * @param {object} options
 * @return {*}
 */
exports.deletePermanently = async (options) => {
  const [result] = await pgCore(options?.table).where(options?.where).del().returning(options?.column)
  return result
}
/**
 *
 *
 * @param {*} query
 * @return {*}
 */
exports.raw = async (query) => {
  const result = await pgCore.raw(query)

  return result
}

exports.checkSameValueinDb = async (options) => {
  if (options?.where) {
    const [result] = await fetchByParam(options)
    if (result) {
      throw new Error(options?.message)
    }
  }
}

exports.checkSameValueinDbUpdate = async (options) => {
  const [result] = await fetchByParam(options)
  const id = result?.[options?.column]
  if (id && +id !== +options.name) {
    throw new Error(options?.message)
  }
}

exports.checkSameValueinDbUpdateUuid = async (options) => {
  const [result] = await fetchByParam(options)
  const id = result?.[options?.column]
  if (id && id !== options?.name) {
    throw new Error(options?.message)
  }
}

module.exports.fetchByParam = fetchByParam
