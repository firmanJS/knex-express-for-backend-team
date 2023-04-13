import { Request } from 'express'
import { Knex } from 'knex'
import pgCore from '../../config/database'
import { LogInterface } from '../../interface/entity_interface'
import { CountInterface, RepositoryInterface } from '../../interface/repository_interface'
import { RequestOptionsInterface } from '../../interface/request_interface'
import { DtoInterface } from '../../interface/response_interface'
import Translate from '../../lang'
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

  private readonly column: [string] = ['id']

  private readonly sort: string[] = ['id', 'ASC']

  async create(req: Request, payload: TodoPost): Promise<DtoInterface> {
    try {
      const [result]: TodoInterface[] = await pgCore(this.table)
        .insert(payload).returning(this.column[0])
      return utils?.mappingSuccess(Translate.__('created.success'), result)
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  async get(req: Request, options: RequestOptionsInterface): Promise<DtoInterface> {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(this.column)
      query = RequestRepoOptions(options, query)
      const result: TodoInterface = await mapOutput(options, query)
      const [rows]: CountInterface[] = await sql(options).clone().count(this.column[0])
      return utils?.mappingSuccess(Translate.__('get.success'), {
        result,
        count: rows?.count
      })
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  async getByParam(req: Request, options: RequestOptionsInterface): Promise<DtoInterface> {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(this.column)
      query = RequestRepoOptions(options, query)
      const result: TodoInterface = await mapOutput(options, query)
      if (result) {
        return utils?.mappingSuccess(Translate.__('get.success'), result)
      }
      return utils?.mappingSuccess(
        Translate.__('notfound.id', { id: options?.where?.id }),
        result,
        Http.NOT_FOUND
      )
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  async update(req: Request, options: RequestOptionsInterface | any) {
    try {
      let message = ''
      if (options?.type_method === 'update') {
        message = Translate.__('updated.success', { id: options?.where?.id })
      } else {
        message = Translate.__('archive.success', { id: options?.where?.id })
      }
      options.table = this.table
      options.column = this.column['0']
      const result: any = {}
      if (result) {
        return utils?.mappingSuccess(message, result)
      }
      return utils?.mappingSuccess(Translate.__('notfound.id', { id: options?.where?.id }), result, 404, false)
    } catch (error: any) {
      error.path_filename = __filename
      return utils?.mappingError(req, error)
    }
  }

  COLUMN(): string[] { return this.column }

  SORT(): string[] { return this.sort }
}
