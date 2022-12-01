/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} paramsHttp if request condition is and operator, you can use this
 * @return {JSON}
*/

const repository = require('./todo_repository')
const service = require('../../service')
const { paramsHttp, bodyHttp, METHOD } = require('../../utils')

const optionsPayload = (req, type_method) => {
  const where = paramsHttp(req)
  const payload = bodyHttp(req)
  where.deleted_at = null
  const options = {
    where,
    type_method,
    column: ['name'],
    payload
  }

  return options
}

const store = async (req, res) => service.store({ req, res, repository })
const fetch = async (req, res) => service.fetch({ req, res, repository })
const fetchByParam = async (req, res) => service.fetchByParam({ req, res, repository })
const update = async (req, res) => {
  let type = ''
  if (req?.method === METHOD.DEL) {
    type = 'soft-delete'
  } else {
    type = 'update'
  }
  const condition = optionsPayload(req, type)
  return service.update({
    req, res, repository, condition
  })
}

module.exports = {
  store,
  fetch,
  fetchByParam,
  update
}
