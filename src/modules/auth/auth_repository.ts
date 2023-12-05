import { Request } from 'express';
import { Knex } from 'knex';
import pgCore from '../../config/database';
import { JwtInterface } from '../../interface/entity_interface';
import { DtoInterface } from '../../interface/response_interface';
import Translate from '../../lang';
import { Auth, Constant, Exception } from '../../utils';
import { AuthContractInterface, AuthResponseInterface } from './auth_interface';

const table: string = Constant.Table.USERS;

export default class AuthRepository implements AuthContractInterface {
  private readonly table: string = table;

  private readonly column: string[] = ['id', 'username', 'email', 'full_name'];

  private readonly column_login: string[] = ['id', 'password', 'salt'];

  async register(
    req: Request,
    payload: Record<string, string>
  ): Promise<DtoInterface> {
    try {
      const [result]: AuthResponseInterface[] = await pgCore(this.table)
        .insert(payload)
        .returning(this.column);
      return Exception.mappingSuccess(Translate.__('register.success'), result);
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }

  async login(
    req: Request,
    payload: Record<string, string>
  ): Promise<DtoInterface> {
    try {
      const query: Knex.QueryBuilder = pgCore(this.table)
        .where((builder) => {
          builder.where('username', payload.username);
          builder.orWhere('email', payload.username);
          builder.andWhere('deleted_at', null);
        })
        .select(this.column_login);
      const result: AuthResponseInterface = await query.first();
      const validationPassword: boolean = Auth.isValidPassword({
        password: payload?.password,
        hash: result?.password,
        salt: result?.salt
      });
      if (result && validationPassword === true) {
        const token: JwtInterface = Auth.setToken({ id: result?.id });
        return Exception.mappingSuccess(Translate.__('auth.success'), token);
      }
      return Exception.mappingSuccess(Translate.__('auth.error'), result);
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }
}
