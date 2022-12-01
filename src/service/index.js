/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} paramsHttp if request condition is and operator, you can use this
 * @return {JSON}
*/

const {
  baseResponse, paginationResponse, paramsHttp, dynamicFilter, paging,
  dynamicOrder, bodyHttp
} = require('../utils')

const store = async (options) => {
  const payload = bodyHttp(options?.req)
  const result = await options?.repository.create(options?.req, payload)
  return baseResponse(options?.res, result)
}

const fetch = async (options) => {
  const where = dynamicFilter(options?.req, options?.repository.COLUMN)
  const filter = paging(options?.req, options?.repository.DEFAULT_SORT)
  const order = dynamicOrder(filter)
  const condition = { where, order, filter }
  const result = await options?.repository.get(options?.req, condition)
  return paginationResponse(options?.req, options?.res, result)
}

const fetchByParam = async (options) => {
  const where = paramsHttp(options?.req)
  const condition = { where }
  const result = await options?.repository.getByParam(options?.req, condition)
  return baseResponse(options?.res, result)
}

const update = async (options) => {
  const result = await options?.repository.update(options?.req, options?.condition)
  return baseResponse(options?.res, result)
}
module.exports = {
  store,
  fetch,
  fetchByParam,
  update
}
