import { Request, Response } from 'express'
import BaseHandlerInterface from '../../interface/handler_interface'
import {
  RequestOptionsInterface, RequestOrderInterface, RequestQueryInterface,
  RequestQueryParamInterface
} from '../../interface/request_interface'
import { DtoInterface } from '../../interface/response_interface'
import utils from '../../utils'
import { Method } from '../../utils/enum'
import { optionsPayload } from '../../utils/request'
import { TodoPost } from './todo_interface'
import TodoRepository from './todo_repository'
// custom interface extends
// interface CustomInterface extends BaseHandlerInterface {
//   stores(req: Request, res: Response): Promise<Response>
// }
class TodoHandler implements BaseHandlerInterface {
  private repo: TodoRepository

  constructor() {
    this.repo = new TodoRepository()
  }

  store = async (req: Request, res: Response): Promise<Response> => {
    const payload: TodoPost = req?.body
    const result: DtoInterface = await this.repo.create(req, payload)
    return utils.baseResponse(res, result)
  }

  fetch = async (req: Request, res: Response): Promise<Response> => {
    const where: RequestQueryParamInterface = utils.dynamicFilter(req, this.repo.COLUMN())
    const filter: RequestQueryInterface = utils.paging(req)
    const order: RequestOrderInterface = utils.dynamicOrder(req, this.repo.SORT())
    const options: RequestOptionsInterface = { where, order, filter, type: 'array' }

    const result: DtoInterface = await this.repo.get(req, options)
    return utils.paginationResponse(req, res, result)
  }

  fetchByParam = async (req: Request, res: Response): Promise<Response> => {
    const options: RequestOptionsInterface = {
      where: {
        id: req?.params?.id
      },
      type: 'object'
    }
    const result: DtoInterface = await this.repo.getByParam(req, options)
    return utils.baseResponse(res, result)
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    let type = ''
    if (req?.method === Method.DEL) {
      type = 'soft-delete'
    } else {
      type = 'update'
    }
    const options = optionsPayload(req, type)
    const result = await this.repo.update(req, options)
    return utils.baseResponse(res, result)
  }
}

export default new TodoHandler()
