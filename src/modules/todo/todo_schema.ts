import { RequestOptionsInterface } from '../../interface/request_interface';
import { Constant } from '../../utils';
import { isSoftDeleted } from '../../utils/request';

export const table: string = Constant.Table.TODO;
export const column: string[] = ['id', 'name', 'description'];
export const sort: string[] = [column[0], 'ASC'];

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
