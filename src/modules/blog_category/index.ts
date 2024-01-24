import { Request, Response } from 'express';
import { uuidValidation } from '../../middleware/validation';
import BaseRest from '../../route/base';
import BlogCategoryHandler from './blogcategory.handler';
import { postValidation, putValidation } from './blogcategory.validation';

class BlogCategoryRoutes extends BaseRest {
  public routes(): void {
    this.router.post(
      '/',
      postValidation,
      async (req: Request, res: Response) => {
        await BlogCategoryHandler.store(req, res);
      }
    );
    this.router.get('/', async (req: Request, res: Response) => {
      await BlogCategoryHandler.fetch(req, res);
    });
    this.router.get(
      '/:id',
      uuidValidation,
      async (req: Request, res: Response) => {
        await BlogCategoryHandler.fetchByParam(req, res);
      }
    );
    this.router.put(
      '/:id',
      uuidValidation,
      putValidation,
      async (req: Request, res: Response) => {
        await BlogCategoryHandler.update(req, res);
      }
    );
    this.router.delete(
      '/:id',
      uuidValidation,
      async (req: Request, res: Response) => {
        await BlogCategoryHandler.update(req, res);
      }
    );
  }
}

export default new BlogCategoryRoutes().router;
