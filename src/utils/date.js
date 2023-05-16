const dayjs = require('dayjs');
const { APP_TZ } = require('../config');

const TZ = APP_TZ ?? 'Asia/Jakarta';
const DATE_FORMAT_INDO = 'DD-MM-YYYY HH:mm:ss';

exports.customFormat = (date = new Date().toISOString(), format = DATE_FORMAT_INDO) => {
  const newDate = dayjs(date, TZ).format(format);
  return newDate;
};
