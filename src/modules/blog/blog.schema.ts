import { RequestOptionsInterface } from '../../interface/request.interface';
import { Constant } from '../../utils';
import { isSoftDeleted } from '../../utils/request';

export const table: string | any = Constant.Table.BLOG;
export const referCategory: string | any = Constant.Table.BLOG_CAT;
export const column: string[] = [
  `${table.id}`,
  `${table.title}`,
  `${table.description}`,
  `${table.id}`
];
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
