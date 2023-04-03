/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import BaseHandlerInterface from '../../interface/handler_interface'
import { RequestOptionsInterface } from '../../interface/request_interface'
import utils from '../../utils'
import { Method } from '../../utils/enum'
import { optionsPayload } from '../../utils/request'
import { TodoPost } from './todo_interface'
import TodoRepository from './todo_repository'
// custom interface extends
// interface CustomInterface extends BaseHandlerInterface {
//   stores(req: Request, res: Response): Promise<Response>
// }

// const repo: TodoRepository = new TodoRepository();
export default new class TodoHandler implements BaseHandlerInterface {
  async store(req: Request, res: Response): Promise<Response> {
    const payload: TodoPost = req?.body
    const result = await TodoRepository.create(req, payload)
    return utils.baseResponse(res, result)
  }

  async fetch(req: Request, res: Response): Promise<Response> {
    const where = utils.dynamicFilter(req, ['id'])
    const filter = utils.paging(req)
    const order = utils.dynamicOrder(req, ['id', 'asc'])
    const options = {
      where, order, filter, type: 'array'
    }
    const result = await TodoRepository.get(req, options)
    return utils.paginationResponse(req, res, result)
  }

  async fetchByParam(req: Request, res: Response): Promise<Response> {
    const options: RequestOptionsInterface = {
      where: {
        id: req?.params?.id
      },
      type: 'object'
    }
    const result = await TodoRepository.getByParam(req, options)
    return utils.baseResponse(res, result)
  }

  async update(req: Request, res: Response): Promise<Response> {
    let type = ''
    if (req?.method === Method.DEL) {
      type = 'soft-delete'
    } else {
      type = 'update'
    }
    const options = optionsPayload(req, type)
    const result = await TodoRepository.update(req, options)
    return utils.baseResponse(res, result)
  }
}()
