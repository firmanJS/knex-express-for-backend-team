import { Request, Response } from 'express';
import { BaseHandlerInterface } from '../../interface/handler.interface';
import { RequestOptionsInterface } from '../../interface/request.interface';
import { Exception, RequestUtils } from '../../utils';
import {
  isCreated,
  optionsPayload,
  validateRequest
} from '../../utils/request';
import { queryParam } from '../todo/todo.schema';
import { BlogPost } from './blog.interface';
import BlogRepository from './blog.repository';
import { bodyRequest, sort } from './blog.schema';

export default new (class Blog implements BaseHandlerInterface {
  private readonly repo: BlogRepository;

  constructor() {
    this.repo = new BlogRepository();
  }

  async store(req: Request, res: Response): Promise<Response> {
    let payload: BlogPost = isCreated(req);
    payload = validateRequest(req, bodyRequest, 'body');
    const result = await this.repo.create(req, payload);
    return Exception.baseResponse(req, res, result);
  }

  async fetch(req: Request, res: Response): Promise<Response> {
    const where = RequestUtils.dynamicFilter(req, queryParam);
    const filter = RequestUtils.paging(req);
    const order = RequestUtils.dynamicOrder(req, sort);
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
