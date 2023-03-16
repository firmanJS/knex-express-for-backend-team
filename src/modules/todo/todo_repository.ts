import { Request } from 'express'
import pgCore from '../../config/database'
import { DtoInterface } from '../../interface/response_interface'
import Translate from '../../lang'
import utils from '../../utils'
import { Table } from '../../utils/enum'
import { TodoPost } from './todo_interface'

interface RespositoryInterface {
  create(req: Request, payload: object): Promise<DtoInterface>
}


class TodoRepository implements RespositoryInterface {
  private table: string = Table.TODO
  private column: [string] = ['id']

  create = async (req: Request, payload: TodoPost): Promise<DtoInterface> => {
    try {
      const [result] = await pgCore(this.table).insert(payload).returning(this.column)
      return utils.mappingSuccess(Translate.__('created.success'), result)
    } catch (error: any) {
      error.path_filename = __filename
      return utils.mappingError(req, error)
    }
  }
}

export default TodoRepository
