const paramsHttp = (req) => ({
  ...req?.params
})

const queryHttp = (req) => ({
  ...req?.query
})

const bodyHttp = (req) => ({
  ...req?.query
})

const isNumeric = (str) => {
  try {
    if (typeof str !== 'string') return false
    return !Number.isNaN(str) && !Number.isNaN(parseFloat(str))
  } catch (error) {
    return error
  }
}

const convertToSlug = (text = '') => {
  try {
    return text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  } catch (error) {
    return error
  }
}

const replaceString = (str, from, to = '') => {
  try {
    return str.replace(from, to)
  } catch (error) {
    return error
  }
}

const ucword = (str = '') => {
  try {
    return (`${str}`).replace(/^([a-z])|\s+([a-z])/g, ($1) => $1.toUpperCase())
  } catch (error) {
    return error
  }
}

module.exports = {
  queryHttp,
  paramsHttp,
  bodyHttp,
  isNumeric,
  convertToSlug,
  replaceString,
  ucword
}
