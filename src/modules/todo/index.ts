import { Request, Response } from 'express';
import { uuidValidation } from '../../middleware/validation';
import BaseRest from '../../route/base';
import TodoHandler from './todo_handler';
import { postValidation, putValidation } from './todo_validation';

class TodoRoutes extends BaseRest {
  public routes(): void {
    this.router.post(
      '/',
      postValidation,
      async (req: Request, res: Response) => {
        await TodoHandler.store(req, res);
      }
    );
    this.router.get('/', async (req: Request, res: Response) => {
      await TodoHandler.fetch(req, res);
    });
    this.router.get(
      '/:id',
      uuidValidation,
      async (req: Request, res: Response) => {
        await TodoHandler.fetchByParam(req, res);
      }
    );
    this.router.put(
      '/:id',
      uuidValidation,
      putValidation,
      async (req: Request, res: Response) => {
        await TodoHandler.update(req, res);
      }
    );
    this.router.delete(
      '/:id',
      uuidValidation,
      async (req: Request, res: Response) => {
        await TodoHandler.destroy(req, res);
      }
    );
  }
}

export default new TodoRoutes().router;
