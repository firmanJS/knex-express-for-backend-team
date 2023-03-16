import { Request, Response } from 'express'
import BaseHandlerInterface from '../../interface/handler_interface'
import utils from '../../utils'
import { TodoPost } from './todo_interface'
import TodoRepository from './todo_repository'
// custom interface extends
// interface CustomInterface extends BaseHandlerInterface {
//   stores(req: Request, res: Response): Promise<Response>
// }

class TodoHandler implements BaseHandlerInterface {
  repo: TodoRepository

  constructor() {
    this.repo = new TodoRepository()
  }

  store = async (req: Request, res: Response): Promise<Response> => {
    const payload: TodoPost = req?.body
    const result = await this.repo.create(req, payload)
    return utils.baseResponse(res, result)
  }

  // fetch = async (req:Request, res: Response): Promise<Response> => {
  //   try {
  //     const result: PaginationResponseInterface = await this.usecase.read(req)
  //     return JsonMessage.succesWithMetaResponse(req, res, result)
  //   } catch (error: any) {
  //     return JsonMessage.catchResponse(error, res)
  //   }
  // }

  // fetchByParam = async (req:Request, res: Response): Promise<Response> => {
  //   try {
  //     const id: string = req?.params?.id.toString()
  //     const result: DataInterface = await this.usecase.readByParam(req)
  //     if (!result.data) {
  //       const message: string = Lang.__('not_found.id', { id })
  //       return JsonMessage.NotFoundResponse(res, message)
  //     }
  //     const message: string = Lang.__('get.id', { id })
  //     return JsonMessage.successResponse(res, Lang.__('get'), message, result.data!)
  //   } catch (error: any) {
  //     return JsonMessage.catchResponse(error, res)
  //   }
  // }

  // update = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     const id: string = req?.params?.id.toString()
  //     const { body } = req
  //     const result: ResultBoolInterface = await this.usecase.update(req)
  //     if (!result.status) {
  //       const message: string = Lang.__('not_found.id', { id })
  //       return JsonMessage.NotFoundResponse(res, message)
  //     }
  //     const message: string = Lang.__('updated.success', { id })
  //     return JsonMessage.successResponse(res, Lang.__('updated'), message, body)
  //   } catch (error: any) {
  //     return JsonMessage.catchResponse(error, res)
  //   }
  // }

  // delete()
}

export default new TodoHandler()
