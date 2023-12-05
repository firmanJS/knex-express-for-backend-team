import { Request, Response } from 'express';
import { BaseHandlerInterface } from '../../interface/handler_interface';
import { RequestOptionsInterface } from '../../interface/request_interface';
import { Exception, RequestUtils } from '../../utils';
import { isCreated, optionsPayload } from '../../utils/request';
import { TodoPost } from './todo_interface';
import TodoRepository from './todo_repository';

// custom interface extends
// interface CustomInterface extends BaseHandlerInterface {
//   stores(req: Request, res: Response): Promise<Response>
// }

export default new (class TodoHandler implements BaseHandlerInterface {
  private readonly repo: TodoRepository;

  constructor() {
    this.repo = new TodoRepository();
  }

  async store(req: Request, res: Response): Promise<Response> {
    /* if not using created at and created by using this */
    // const payload: TodoPost = req.body
    const payload: TodoPost = isCreated(req);
    const result = await this.repo.create(req, payload);
    return Exception.baseResponse(req, res, result);
  }

  async fetch(req: Request | any, res: Response): Promise<Response> {
    const where = RequestUtils.dynamicFilter(req, this.repo.COLUMN());
    const filter = RequestUtils.paging(req);
    const order = RequestUtils.dynamicOrder(req, this.repo.SORT());
    const options = {
      where,
      order,
      filter,
      type: 'array'
    };
    const result = await this.repo.get(req, options);
    return Exception.paginationResponse(req, res, result);
  }

  async fetchByParam(req: Request, res: Response): Promise<Response> {
    const options: RequestOptionsInterface = {
      where: {
        id: req?.params?.id
      },
      type: 'object'
    };
    const result = await this.repo.getByParam(req, options);
    return Exception.baseResponse(req, res, result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const options = optionsPayload(req);
    const result = await this.repo.update(req, options);
    return Exception.baseResponse(req, res, result);
  }
})();
