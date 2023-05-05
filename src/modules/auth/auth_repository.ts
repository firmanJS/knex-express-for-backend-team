import { Request } from 'express';
import pgCore from '../../config/database';
import { DtoInterface } from '../../interface/response_interface';
import Translate from '../../lang';
import { Constant, Exception } from '../../utils';
import { AuthContractInterface, AuthResponseInterface } from './auth_interface';

const table: string = Constant.Table.USERS;

export default class AuthRepository implements AuthContractInterface {
  private readonly table: string = table;

  private readonly column: string[] = ['id', 'username', 'email', 'full_name'];

  async register(req: Request, payload: Record<string, string>): Promise<DtoInterface> {
    try {
      const [result]: AuthResponseInterface[] = await pgCore(this.table)
        .insert(payload)
        .returning(this.column);
      return Exception.mappingSuccess(Translate.__('created.success'), result);
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }

  async login(req: Request, payload: Record<string, string>): Promise<DtoInterface> {
    try {
      const [result]: AuthResponseInterface[] = await pgCore(this.table)
        .insert(payload)
        .returning(this.column);
      return Exception.mappingSuccess(Translate.__('created.success'), result);
    } catch (error: any) {
      error.path_filename = __filename;
      return Exception.mappingError(req, error);
    }
  }
}
