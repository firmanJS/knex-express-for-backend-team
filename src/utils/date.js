const moment = require('moment')
const DEFAULT_FORMAT = 'DD-MM-YYYY'

const customDateFormat = (date = new Date().toISOString(), format = DEFAULT_FORMAT) => {
  const newDate = moment(date).format(format)
  return newDate
}

const manipulateDate = (result = {}, isArray = true) => {
  let mapping

  if (isArray) {
    mapping = result.map((r) => {
      r.created_at = fullDateFormat(r.created_at)
      r.updated_at = fullDateFormat(r.updated_at)
      r.deleted_at = fullDateFormat(r.deleted_at)
      return r
    })
  } else {
    result.created_at = fullDateFormat(result?.created_at)
    result.updated_at = fullDateFormat(result?.updated_at)
    result.deleted_at = fullDateFormat(result?.deleted_at)
    mapping = result
  }

  return mapping
}

module.exports = {
  customDateFormat,
  manipulateDate
}
