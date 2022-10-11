const { decodeToken } = requrie('./auth')

const requestHttp = (req) => ({
  ...req?.params
})

const payloadWithUsers = (options) => {
  let payload = {}
  switch (options?.type) {
    case 'created-all':
      payload = { ...options?.req?.body, ...decodeToken('created', req) }
      break
    case 'created-only':
      payload =  payload = { ...decodeToken('created', req) }
      break
    case 'updated-only':
      payload = { ...decodeToken('updated', req), type_method: 'updated' }
      break
    case 'updated-all':
      payload = { ...options?.req?.body, ...decodeToken('updated', req), type_method: 'updated' }
      break
    case 'deleted':
      payload = { ...options?.req?.body, ...decodeToken('deleted', req), type_method: 'soft-deleted' }
      break
    default:
      payload
  }
  return payload
}

const isNumeric = (str) => {
  if (typeof str !== 'string') return false
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str))
}

const validationId = (req, name) => {
  let where
  if (isNumeric(req.params[name])) {
    where = requestHttp(req)
  } else {
    where = { [name]: 0 }
  }

  return where
}

const convertToSlug = (text = '') => text.toLowerCase()
  .replace(/[^\w ]+/g, '')
  .replace(/ +/g, '-')

const replaceString = (str, from, to = '') => str.replace(from, to)

const ucword = (str = '') => (`${str}`).replace(/^([a-z])|\s+([a-z])/g, ($1) => $1.toUpperCase())

module.exports = {
  requestHttp,
  isNumeric,
  convertToSlug,
  validationId,
  replaceString,
  ucword,
  formatRp,
  alphaNumeric,
  strMasked,
  removeDomain,
  addWatermark,
  payloadWithUsers,
}
