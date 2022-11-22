/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} paramsHttp if request condition is and operator, you can use this
 * @return {JSON}
*/

const repository = require('./postgre_repository')
const {
  baseResponse, paginationResponse, paramsHttp, dynamicFilter, paging,
  payloadWithUsers
} = require('../../utils')

const store = async (req, res) => {
  const payload = payloadWithUsers({ req, type: 'created-all' })
  const result = await repository.create(req, payload)
  return baseResponse(res, result)
}

const fetch = async (req, res) => {
  const where = dynamicFilter(req, repository.COLUMN)
  const filter = paging(req, repository.DEFAULT_SORT)
  const result = await repository.get(req, where, filter)
  return paginationResponse(req, res, result)
}

const fetchByParam = async (req, res) => {
  const where = paramsHttp(req)
  const result = await repository.getByParam(where)
  return baseResponse(res, result)
}

const update = async (req, res) => {
  const where = paramsHttp(req)
  where.deleted_at = null
  const payload = payloadWithUsers({ req, type: 'updated-all' })
  const result = await repository.update(req, where, payload)
  return baseResponse(res, result)
}

const softDelete = async (req, res) => {
  const where = paramsHttp(req)
  const payload = payloadWithUsers({ req, type: 'deleted-all' })
  where.deleted_at = null
  const result = await repository.update(req, where, payload, 'name')
  return baseResponse(res, result)
}

module.exports = {
  store,
  fetch,
  fetchByParam,
  update,
  softDelete
}
