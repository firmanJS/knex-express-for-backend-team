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
  dynamicOrder, bodyHttp, METHOD
} = require('../utils')

// const optionsPayload = (req, type_method) => {
//   const where = paramsHttp(req)
//   const payload = bodyHttp(req)
//   where.deleted_at = null
//   const options = {
//     where,
//     type_method,
//     column: ['name', 'email'],
//     payload
//   }

//   return options
// }

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

module.exports = {
  store,
  fetch
}
