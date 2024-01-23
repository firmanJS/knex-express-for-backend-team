import { RequestOptionsInterface } from '../../interface/request.interface';
import { Constant } from '../../utils';
import { isSoftDeleted } from '../../utils/request';

export const table: string = Constant.Table.BLOG;
export const column: string[] = ['id', 'name', 'description'];
export const sort: string[] = [column[0], 'ASC'];
export const bodyRequest: string[] = ['name', 'description'];
export const queryRequest: string[] = ['name'];
export const condition = (
  builder: any,
  options: RequestOptionsInterface | any
) => {
  const single: boolean = true;
  builder = isSoftDeleted(options.where, builder, single);
  if (options?.filter?.search) {
    builder.whereILike('name', `%${options?.filter?.search}%`);
    builder.orWhereILike('description', `%${options?.filter?.search}%`);
    builder.andWhere('deleted_at', null);
  }
  return builder;
};
