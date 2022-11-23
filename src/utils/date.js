const moment = require('moment')

const TZ = process?.env?.TZ ?? 'Asia/Jakarta'
const DATE_FORMAT_INDO = 'DD MMMM YYYY, H:mm:ss'
const LOG_FORMAT = 'DD-MM-YYYY'

const fullDateFormatIndo = (date) => {
  const dateManipualte = moment(new Date(date).getTime()).format(
    DATE_FORMAT_INDO
  )
  const getNameDay = moment(date).locale('id').format('dddd')

  return `${getNameDay}, ${dateManipualte}`
}
const nowWithUtc = (date = Date.now(), formatDate = LOG_FORMAT) => {
  const format = moment(new Date(date).getTime()).utc(TZ).format(formatDate)
  return format
}

const todayFormat = (format, date = new Date().toISOString()) => {
  const newDate = moment(new Date(date)).format(format)
  return newDate
}

module.exports = {
  nowWithUtc,
  todayFormat,
  fullDateFormatIndo
}
