/* eslint-disable no-restricted-syntax */
import { Request } from 'express';
import {
  RequestOptionsInterface,
  RequestOrderInterface,
  RequestQueryInterface,
  RequestSoftInterface
} from '../interface/request.interface';
import { OutputInterface } from '../interface/response.interface';
import Constant, { LIMIT, PAGE } from './constant';
import { standartDateISO } from './date';

namespace RequestUtils {
  export const paging = (req: Request): RequestQueryInterface => {
    const page = Number(req?.query?.page) || PAGE;
    const limit = Number(req?.query?.limit) || LIMIT;
    const search = (req?.query?.search as string) || '';

    return {
      page,
      limit,
      search
    };
  };

  export const dynamicFilter = (
    req: Request,
    column: string[] = []
  ): OutputInterface => {
    const push: any = {};
    const asArray = Object.entries(req?.query);
    const filtered = asArray.filter(([key]) => column.includes(key));
    const newObject = Object.fromEntries(filtered);

    for (const prop in newObject) {
      if (prop) {
        push[prop] = newObject[prop];
      }
    }
    return push;
  };

  export const validateRequest = (
    req: Request | any,
    column: string[] = [],
    type: string = 'query'
  ): Record<string, string> => {
    try {
      const request: [string, string][] = Object.entries(req[type]);
      const data: Record<string, string> = {};

      for (const [i, v] of request) {
        const check = column.find((item) => item === i);

        if (check && v !== '') {
          data[check] = v;
        }
      }
      return data;
    } catch (error) {
      console.log('error request validation', error);
      return {};
    }
  };

  export const dynamicOrder = (
    req: Request | any,
    defaultOrder: string[] = []
  ): RequestOrderInterface => {
    let order: object;
    const direction = req?.query?.direction || defaultOrder[0];
    const orders = req?.query?.order || defaultOrder[1];
    if (typeof orders === 'string' && typeof direction === 'string') {
      order = [{ column: direction, order: orders }];
    } else {
      const content = [];
      for (const a in direction) {
        if ({}.hasOwnProperty.call(a, direction)) {
          content.push({ column: direction[a], order: orders[a] });
        }
      }
      order = content;
    }

    return order;
  };

  export const RequestRepoOptions = (
    options: RequestOptionsInterface | any,
    query: any
  ): void | any => {
    if (options?.order && options?.order) {
      query.orderBy(options.order);
    }
    if (options?.filter?.limit) {
      query.limit(options.filter.limit);
    }
    if (options?.filter?.page && options?.filter?.limit) {
      query.offset((options.filter.page - 1) * options.filter.limit);
    }
    return query;
  };

  export const isSoftDeleted = (
    where: RequestSoftInterface,
    builder: any,
    type: boolean
  ): void | any => {
    builder.where(where);
    if (type) builder.andWhere('deleted_at', null);
    return builder;
  };

  export const isCreated = (
    req: Request | any
  ): Record<string, string> | any => {
    const payload = req?.body;
    payload.created_by = req?.users_info?.id;
    payload.created_at = standartDateISO();
    return payload;
  };

  const isSoftDeletedCase = (req: Request | any, type: string): void | any => {
    const payload = req?.body;
    if (type === 'update') {
      payload.updated_by = req?.users_info?.id;
      payload.updated_at = standartDateISO();
    } else {
      payload.deleted_by = req?.users_info?.id;
      payload.deleted_at = standartDateISO();
    }
    return payload;
  };

  export const optionsPayload = (req: Request): RequestSoftInterface => {
    const where: any = req?.params;
    let typeMethod: string = '';
    if (req?.method === Constant.Method.DEL) {
      typeMethod = 'soft-delete';
    } else {
      typeMethod = 'update';
    }
    const payload = isSoftDeletedCase(req, typeMethod);
    const options: RequestSoftInterface = {
      where,
      typeMethod,
      column: ['name'],
      payload
    };

    return options;
  };

  export const mapOutput = async (
    options: RequestOptionsInterface,
    query: any
  ): Promise<OutputInterface> => {
    let result: OutputInterface;
    if (options.type === 'array') {
      result = await query;
    } else {
      result = await query.first();
    }

    return result;
  };
}
export = RequestUtils;
