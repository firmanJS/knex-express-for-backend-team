import pgCore from '../config/database'
import { RequestOptionsInterface } from '../interface/request_interface'
import { todayFormat } from '../utils/date'

const format = todayFormat('YYYYMMDDhmmss')
class CoreRepository {

  private fetchByParam = async (options: RequestOptionsInterface) => {
    const result = await pgCore(options?.table).where(options?.where).select(options?.column)
    return result
  }

  updated = async (options: RequestOptionsInterface) => {
    const loop = (rows: any) => {
      options.payload.deleted_at = new Date().toISOString()
      for (const prop in options?.column) {
        options.payload[options?.column[prop]] = `archived-${format}-${rows[options?.column[prop]]}`
      }

      return options
    }

    if (options?.type_method === 'soft-delete') {
      const [rows] = await this.fetchByParam(options)
      options.payload.deleted_at = new Date().toISOString()
      if (rows) {
        loop(rows)
      }
    }

    const [result] = await pgCore(options?.table).where(options?.where)
    .update(options?.payload).returning(options?.column)

    return result
  }
}

export default new CoreRepository
