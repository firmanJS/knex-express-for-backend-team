const moment = require('moment');

const TZ = process?.env?.TZ ?? 'Asia/Jakarta'
const DATE_FORMAT_INDO = 'DD-MM-YYYY, HH:mm:ss'
const LOG_FORMAT = 'DD-MM-YYYY'

exports.fullDateFormatIndo = (date) => {
  const dateManipualte = moment(new Date(date).getTime()).format(
    DATE_FORMAT_INDO
  );
  const getNameDay = moment(date).locale('id').format('dddd');

  return `${getNameDay}, ${dateManipualte}`;
};
exports.nowWithUtc = (date = Date.now(), formatDate = LOG_FORMAT) => {
  const format = moment(new Date(date).getTime()).utc(TZ).format(formatDate);
  return format;
};

exports.todayFormat = (format = DATE_FORMAT_INDO, date = new Date().toISOString()) => {
  const newDate = moment(new Date(date)).format(format)
  return newDate
}
