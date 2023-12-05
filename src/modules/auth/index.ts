import { Request, Response } from 'express';
import BaseRest from '../../route/base';
import TodoHandler from './auth_handler';
import { postValidation, registerValidation } from './auth_validation';

class AuthRoutes extends BaseRest {
  public routes(): void {
    this.router.post(
      '/register',
      postValidation,
      async (req: Request, res: Response) => {
        await TodoHandler.register(req, res);
      }
    );
    this.router.post(
      '/login',
      registerValidation,
      async (req: Request, res: Response) => {
        await TodoHandler.login(req, res);
      }
    );
    // this.router.get('/me', async (req: Request, res: Response) => {
    //   await TodoHandler.fetch(req, res);
    // });
    // this.router.post('/refresh-token', uuidValidation, async (req: Request, res: Response) => {
    //   await TodoHandler.fetchByParam(req, res);
    // });
    // this.router.
    // put('/:id', uuidValidation, putValidation, async (req: Request, res: Response) => {
    //   await TodoHandler.update(req, res);
    // });
    // this.router.delete('/:id', uuidValidation, async (req: Request, res: Response) => {
    //   await TodoHandler.update(req, res);
    // });
  }
}

export default new AuthRoutes().router;
