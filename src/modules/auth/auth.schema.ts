import { Constant } from '../../utils';

export const table: string = Constant.Table.USERS;
export const column: string[] = ['id', 'username', 'email', 'full_name'];
export const columnLogin: string[] = ['id', 'password', 'salt'];
