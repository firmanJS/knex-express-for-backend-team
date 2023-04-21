import pgCore from '../config/database'
import { RequestOptionsInterface } from '../interface/request_interface'
import { todayFormat } from '../utils/date'

const format = todayFormat('YYYYMMDDhmmss')
export const coreUpdate = async (options: RequestOptionsInterface) => {
  /* eslint-disable no-restricted-syntax */
  const loop = (rows: any) => {
    options.payload.deleted_at = new Date().toISOString()
    // eslint-disable-next-line guard-for-in
    for (const prop in options?.column_archived) {
      options.payload[options?.column_archived[prop]] = `archived-${format}-${rows[options?.column_archived[prop]]}`
    }

    return options
  }

  if (options?.typeMethod === 'soft-delete') {
    const [rows] = await pgCore(options?.table).where(options?.where).select(options?.column)
    options.payload.deleted_at = new Date().toISOString()
    if (rows) {
      loop(rows)
    }
  }
  const [result] = await pgCore(options?.table).where(options?.where)
    .update(options?.payload).returning(options?.column)

  return result
}
