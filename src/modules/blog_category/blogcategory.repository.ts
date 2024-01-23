import { Request } from 'express';
import { Knex } from 'knex';
import pgCore from '../../config/database';
import { RepositoryInterface } from '../../interface/repository.interface';
import { RequestOptionsInterface } from '../../interface/request.interface';
import { DtoInterface } from '../../interface/response.interface';
import Translate from '../../lang';
import { coreUpdate } from '../../models/core';
import { Constant, Exception, RequestUtils } from '../../utils';
import {
  BlogCategoryInterface,
  BlogCategoryPost
} from './blogcategory.interface';
import { column, condition, table } from './blogcategory.schema';

const sql = (options: RequestOptionsInterface) => {
  const query = pgCore(table).andWhere((builder) => {
    condition(builder, options);
  });

  return query;
};

export default class BlogCategoryRepository implements RepositoryInterface {
  private readonly table = table;

  private readonly column = column;

  private readonly sort = column;

  async create(req: Request, payload: BlogCategoryPost): Promise<DtoInterface> {
    try {
      const [result]: BlogCategoryInterface[] = await pgCore(this.table)
        .insert(payload)
        .returning(this.column[0]);
      return Exception.mappingSuccess(
        Translate.__('created.success'),
        result,
        Constant.Http.CREATED
      );
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
      const result: BlogCategoryInterface = await RequestUtils.mapOutput(
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

  COLUMN(): string[] {
    return this.column;
  }

  SORT(): string[] {
    return this.sort;
  }
}
