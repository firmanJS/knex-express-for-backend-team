const requestHttp = (req) => ({
  ...req?.params
})

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
}
