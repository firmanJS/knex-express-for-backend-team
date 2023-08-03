const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const { APP_TZ } = require('../config');
const { DATE_FORMAT } = require('./constant');

const TZ = APP_TZ ?? 'Asia/Jakarta';

exports.customFormat = (opt = {
  date: new Date().toISOString(),
  format: DATE_FORMAT.IND
}) => {
  const newDate = dayjs(opt?.date, TZ).format(opt?.format);
  return newDate;
};

exports.standartDate = () => {
  dayjs.extend(utc);
  dayjs.utc().local(TZ).format();
};
