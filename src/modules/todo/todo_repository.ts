import { Request } from 'express'
import { Knex } from 'knex'
import pgCore from '../../config/database'
import { CountInterface, RepositoryInterface } from '../../interface/repository_interface'
import { RequestOptionsInterface } from '../../interface/request_interface'
import { DtoInterface } from '../../interface/response_interface'
import Translate from '../../lang'
import { coreUpdate } from '../../models/core'
import { Constant, Exception, RequestUtils } from '../../utils'
import { TodoInterface, TodoPost } from './todo_interface'

const table: string = Constant.Table.TODO
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

const mapOutput = async (options:RequestOptionsInterface, query: any): Promise<TodoInterface> => {
  let result: TodoInterface
  if (options.type === 'array') {
    result = await query
  } else {
    result = await query.first()
  }

  return result
}
export default class TodoRepository implements RepositoryInterface {
  private readonly table: string = table

  private readonly column: string[] = ['id', 'name', 'description']

  private readonly sort: string[] = [this.column[0], 'ASC']

  async create(req: Request, payload: TodoPost): Promise<DtoInterface> {
    try {
      const [result]: TodoInterface[] = await pgCore(this.table)
        .insert(payload).returning(this.column[0])
      return Exception.mappingSuccess(Translate.__('created.success'), result)
    } catch (error: any) {
      error.path_filename = __filename
      return Exception.mappingError(req, error)
    }
  }

  async get(req: Request, options: RequestOptionsInterface): Promise<DtoInterface> {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(this.column)
      query = RequestUtils.RequestRepoOptions(options, query)
      const result: TodoInterface = await mapOutput(options, query)
      const [rows]: CountInterface[] = await sql(options).clone().count(this.column[0])
      return Exception?.mappingSuccess(Translate.__('get.success'), {
        result,
        count: rows?.count
      })
    } catch (error: any) {
      error.path_filename = __filename
      return Exception?.mappingError(req, error)
    }
  }

  async getByParam(req: Request, options: RequestOptionsInterface): Promise<DtoInterface> {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(this.column)
      query = RequestUtils.RequestRepoOptions(options, query)
      const result: TodoInterface = await mapOutput(options, query)
      if (result) {
        return Exception.mappingSuccess(Translate.__('get.success'), result)
      }
      return Exception.mappingSuccess(
        Translate.__('notfound.id', { id: options?.where?.id }),
        result,
        Constant.Http.NOT_FOUND
      )
    } catch (error: any) {
      error.path_filename = __filename
      return Exception.mappingError(req, error)
    }
  }

  async update(req: Request, options: RequestOptionsInterface | any): Promise<DtoInterface> {
    try {
      let message = ''
      if (options?.typeMethod === 'update') {
        message = Translate.__('updated.success', { id: options?.where?.id })
      } else {
        message = Translate.__('archive.success', { id: options?.where?.id })
      }
      options.table = this.table
      options.column = [this.column[0], this.column[1]]
      options.column_archived = [this.column[1]]
      const result = await coreUpdate(options)
      if (result) {
        return Exception.mappingSuccess(message, result)
      }
      return Exception.mappingSuccess(Translate.__('notfound.id', { id: options?.where?.id }), result, Constant.Http.NOT_FOUND, false)
    } catch (error: any) {
      error.path_filename = __filename
      return Exception.mappingError(req, error)
    }
  }

  COLUMN(): string[] { return this.column }

  SORT(): string[] { return this.sort }
}
