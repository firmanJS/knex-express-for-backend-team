/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} requestHttp if request condition is and operator, you can use this
 * @return {JSON}
*/

const repository = require('./postgre_repository')
const {
  baseResponse, paginationResponse, requestHttp, dynamicFilter, paging, decodeToken
} = require('../../utils')

const store = async (req, res) => {
  const payload = { ...req?.body, ...decodeToken('created', req) }
  const result = await repository.create(payload)
  return baseResponse(res, result)
}

const fetch = async (req, res) => {
  const where = dynamicFilter(req, repository.COLUMN)
  const filter = paging(req, repository.DEFAULT_SORT)
  const result = await repository.get(where, filter)
  return paginationResponse(req, res, result)
}

const fetchByParam = async (req, res) => {
  const where = requestHttp(req)
  const result = await repository.getByParam(where)
  return baseResponse(res, result)
}

const update = async (req, res) => {
  const where = requestHttp(req)
  where.deleted_at = null
  const payload = { ...req?.body, type_method: 'update', ...decodeToken('updated', req) }
  const result = await repository.update(where, payload)
  return baseResponse(res, result)
}

const softDelete = async (req, res) => {
  const where = requestHttp(req)
  const payload = { type_method: 'soft-delete', ...decodeToken('deleted', req) }
  where.deleted_at = null
  const result = await repository.update(where, payload, 'name')
  return baseResponse(res, result)
}

module.exports = {
  store,
  fetch,
  fetchByParam,
  update,
  softDelete
}
