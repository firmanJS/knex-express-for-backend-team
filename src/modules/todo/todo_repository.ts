import { Request } from 'express'
import { Knex } from 'knex'
import pgCore from '../../config/database'
import { LogInterface } from '../../interface/entity_interface'
import { CountInterface, RepositoryInterface } from '../../interface/repository_interface'
import { RequestOptionsInterface } from '../../interface/request_interface'
import { DtoInterface } from '../../interface/response_interface'
import Translate from '../../lang'
import CoreRepository from '../../models/core'
import utils from '../../utils'
import { Http, Table } from '../../utils/enum'
import { RequestRepoOptions } from '../../utils/request'
import { TodoPost } from './todo_interface'
interface TodoInterface extends LogInterface {
  readonly id?: string
  readonly name?: string
  readonly description?: string
}

const table: string = Table.TODO
const column: string[] = ['id', 'name', 'description']
const sort: string[] = ['id', 'ASC']

const condition = (builder: any, options: RequestOptionsInterface | any) => {
  builder.where(options?.where)
  builder.andWhere('deleted_at', null)
  if (options?.filter?.search) {
    builder.whereILike('name', `%${options?.filter?.search}%`)
    builder.orWhereILike('description', `%${options?.filter?.search}%`)
  }
  return builder
}

const sql = (options: RequestOptionsInterface) => {
  const query = pgCore(table)
    .where((builder) => {
      condition(builder, options)
    })

  return query
}

class TodoRepository implements RepositoryInterface {

  private mapOutput = async (options:RequestOptionsInterface, query: any): Promise<TodoInterface> => {
    let result: TodoInterface
    if (options.type === 'array') {
      result = await query
    } else {
      result = await query.first()
    }

    return result
  }

  create = async (req: Request, payload: TodoPost): Promise<DtoInterface> => {
    try {
      const [result]: TodoInterface[] = await pgCore(table).insert(payload).returning(column[0])
      return utils?.mappingSuccess(Translate.__('created.success'), result)
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  get = async (req: Request, options: RequestOptionsInterface | any): Promise<DtoInterface> => {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(column)
      query = RequestRepoOptions(options, query)
      const result: TodoInterface = await this.mapOutput(options, query)
      const [rows]: CountInterface[] = await sql(options).clone().count(column[0])
      return utils?.mappingSuccess(Translate.__('get.success'), {
        result,
        count: rows?.count
      })
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  getByParam = async (req: Request, options: RequestOptionsInterface | any): Promise<DtoInterface> => {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(column)
      query = RequestRepoOptions(options, query)
      const result: TodoInterface = await this.mapOutput(options, query)
      if (result) {
        return utils?.mappingSuccess(Translate.__('get.success'), result)
      }
      return utils?.mappingSuccess(Translate.__('notfound.id', { id: options?.where?.id }), result, Http.NOT_FOUND)
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  update = async (req: Request, options: RequestOptionsInterface | any) => {
    try {
      let message = ''
      if (options?.type_method === 'update') {
        message = Translate.__('updated.success', { id: options?.where?.id })
      } else {
        message = Translate.__('archive.success', { id: options?.where?.id })
      }
      options.table = table
      options.column = column[0]
      const result = await CoreRepository.updated(options)
      if (result) {
        return utils?.mappingSuccess(message, result)
      }
      return utils?.mappingSuccess(Translate.__('notfound.id', { id: options?.where?.id }), result, 404, false)
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  COLUMN(): string[] { return column }

  SORT(): string[] { return sort }
}

export default TodoRepository
