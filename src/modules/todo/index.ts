import { Request, Response } from 'express';
import { bodyValidate } from '../../middleware/validation';
import BaseRest from '../../route/base';
import TodoHandler from './todo_handler';
import { postValidation } from './todo_validation';

class TodoRoutes extends BaseRest {
  public routes(): void {
    this.router.post(
      '/',
      bodyValidate(postValidation),
      async (req: Request, res: Response) => {
        await TodoHandler.store(req, res)
      }
    )
    this.router.get('/', async (req: Request, res: Response) => {
      await TodoHandler.fetch(req, res)
    })
    this.router.get('/:id', async (req: Request, res: Response) => {
      await TodoHandler.fetchByParam(req, res)
    })
  }
}

export default new TodoRoutes().router
