import moment from 'moment'

export const todayFormat = (format: string, date = new Date().toISOString()) => {
  const newDate = moment(new Date(date)).format(format)
  return newDate
}
