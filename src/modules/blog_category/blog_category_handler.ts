import { Request, Response } from 'express';
import { BaseHandlerInterface } from '../../interface/handler_interface';
import { RequestOptionsInterface } from '../../interface/request_interface';
import { Exception, RequestUtils } from '../../utils';
import { optionsPayload } from '../../utils/request';
import { BlogCategoryPost } from './blog_category_interface';
import BlogCategoryRepository from './blog_category_repository';

export default new (class BlogCategory implements BaseHandlerInterface {
  private readonly repo: BlogCategoryRepository;

  constructor() {
    this.repo = new BlogCategoryRepository();
  }

  async store(req: Request, res: Response): Promise<Response> {
    const payload: BlogCategoryPost = req?.body;
    const result = await this.repo.create(req, payload);
    return Exception.baseResponse(res, result);
  }

  async fetch(req: Request, res: Response): Promise<Response> {
    const where = RequestUtils.dynamicFilter(req, this.repo.COLUMN());
    const filter = RequestUtils.paging(req);
    const order = RequestUtils.dynamicOrder(req, this.repo.SORT());
    const options = {
      where,
      order,
      filter,
      type: 'array',
    };
    const result = await this.repo.get(req, options);
    return Exception.paginationResponse(req, res, result);
  }

  async fetchByParam(req: Request, res: Response): Promise<Response> {
    const options: RequestOptionsInterface = {
      where: {
        id: req?.params?.id,
      },
      type: 'object',
    };
    const result = await this.repo.getByParam(req, options);
    return Exception.baseResponse(res, result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const options = optionsPayload(req);
    const result = await this.repo.update(req, options);
    return Exception.baseResponse(res, result);
  }
})();
