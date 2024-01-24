import { Request } from 'express';
import { Knex } from 'knex';
import pgCore from '../../config/database';
import { RepositoryInterface } from '../../interface/repository.interface';
import { RequestOptionsInterface } from '../../interface/request.interface';
import { DtoInterface } from '../../interface/response.interface';
import Translate from '../../lang';
import { coreUpdate } from '../../models/core';
import { Constant, Exception, RequestUtils } from '../../utils';
import { TodoInterface, TodoPost } from './todo.interface';
import { column, condition, table } from './todo.schema';

const sql = (options: RequestOptionsInterface): Knex.QueryBuilder => {
  const query = pgCore(table).where((builder) => {
    condition(builder, options);
  });

  return query;
};

export default class TodoRepository implements RepositoryInterface {
  private readonly table: string = table;

  private readonly column: string[] = column;

  async create(req: Request, payload: TodoPost): Promise<DtoInterface> {
    try {
      const [result]: TodoInterface[] = await pgCore(this.table)
        .insert(payload)
        .returning(this.column[0]);
      return Exception.mappingSuccess(Translate.__('created.success'), result);
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }

  async get(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface> {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(this.column);
      query = RequestUtils.RequestRepoOptions(options, query);
      // const result: TodoInterface = await mapOutput(options, query);
      // const [rows]: CountInterface[] = await sql(options)
      //   .clone()
      //   .count(this.column[0]);
      const [result, [rows]] = await Promise.all([
        RequestUtils.mapOutput(options, query),
        sql(options).clone().count(this.column[0])
      ]);
      return Exception?.mappingSuccess(Translate.__('get.success'), {
        result,
        count: rows?.count
      });
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception?.mappingError(req, error);
    }
  }

  async getByParam(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface> {
    try {
      let query: Knex.QueryBuilder = sql(options).clone().select(this.column);
      query = RequestUtils.RequestRepoOptions(options, query);
      const result: TodoInterface = await RequestUtils.mapOutput(
        options,
        query
      );
      if (result) {
        return Exception.mappingSuccess(Translate.__('get.success'), result);
      }
      return Exception.mappingSuccess(
        Translate.__('notfound.id', { id: options?.where?.id }),
        result,
        Constant.Http.NOT_FOUND
      );
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }

  async update(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface> {
    try {
      let message = '';
      if (options?.typeMethod === 'update') {
        message = Translate.__('updated.success', { id: options?.where?.id });
      } else {
        message = Translate.__('archive.success', { id: options?.where?.id });
      }
      options.table = this.table;
      options.column = [this.column[0], this.column[1]];
      const result = await coreUpdate(options);
      if (result) {
        return Exception.mappingSuccess(message, result);
      }
      return Exception.mappingSuccess(
        Translate.__('notfound.id', { id: options?.where?.id }),
        result,
        Constant.Http.NOT_FOUND,
        false
      );
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }

  async destroy(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface> {
    try {
      const result = await pgCore(this.table).where(options.where).del();
      if (result) {
        return Exception.mappingSuccess(Translate.__('deleted'), result);
      }
      return Exception.mappingSuccess(
        Translate.__('notfound.id', { id: options?.where?.id }),
        { total_deleted: result },
        Constant.Http.NOT_FOUND,
        false
      );
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }
}
