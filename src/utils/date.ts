import moment from 'moment'

const FULL_FORMAT:string = 'DD-MM-YYYY HH:mm:ss'
namespace Dates {
  export const todayFormat = (format: string = FULL_FORMAT, date = new Date().toISOString()) => {
    const newDate = moment(new Date(date)).format(format)
    return newDate
  }
}

export = Dates
