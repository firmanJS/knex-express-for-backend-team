import dayjs from 'dayjs';
import config from '../config';
import Constant from './constant';

const { tz } = config.app;

namespace Dates {
  const dateNow = () => {
    const now = dayjs();
    return now.format();
  };

  export const todayFormat = (
    format = Constant.DATE_FORMAT.LOG,
    date = dateNow()
  ) => {
    const newDate = dayjs(date, tz).format(format);
    return newDate;
  };

  export const standartDateISO = () => dateNow();
}

export = Dates;
