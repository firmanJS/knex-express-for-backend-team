const paramsHttp = (req) => ({
  ...req?.params
})

const queryHttp = (req) => ({
  ...req?.query
})

const bodyHttp = (req) => ({
  ...req?.body
})

const isNumeric = (str) => {
  if (typeof str !== 'string') return false
  return !Number.isNaN(str) && !Number.isNaN(parseFloat(str))
}

const convertToSlug = (text = '') => {
  try {
    return text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  } catch (error) {
    return error.toString()
  }
}

const replaceString = (str, from, to = '') => {
  try {
    return str.replace(from, to)
  } catch (error) {
    return error.toString()
  }
}

const ucword = (str = '') => {
  if (typeof str !== 'string') return str
  return (`${str}`).replace(/^([a-z])|\s+([a-z])/g, ($1) => $1.toUpperCase())
}

const formatCurrency = (currency, options = {
  language: 'id-ID', format: 'IDR'
}) => {
  try {
    const moneyFormat = Intl.NumberFormat(options?.language, {
      style: 'currency',
      currency: options?.format
    });

    return moneyFormat.format(currency)
  } catch (error) {
    return error.toString()
  }
}

module.exports = {
  queryHttp,
  paramsHttp,
  bodyHttp,
  isNumeric,
  convertToSlug,
  replaceString,
  formatCurrency,
  ucword
}
