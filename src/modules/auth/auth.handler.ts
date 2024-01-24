import { Request, Response } from 'express';
import { DtoInterface } from '../../interface/response.interface';
import { Exception } from '../../utils';
import { generatePassword } from '../../utils/auth';
import {
  AuthHandlerInterface,
  AuthRequestInterface,
  LoginRequestInterface
} from './auth.interface';
import AuthRepository from './auth.repository';
/**
 * Rule For Class, must be define handlerInterface in class
 */
export default new (class AuthHandler implements AuthHandlerInterface {
  private readonly repo: AuthRepository;

  constructor() {
    this.repo = new AuthRepository();
  }

  async register(req: Request, res: Response): Promise<Response> {
    const payload: AuthRequestInterface = req?.body;
    const body = generatePassword(payload);
    const result = await this.repo.register(req, body);
    return Exception.baseResponse(req, res, result);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const payload: LoginRequestInterface = req.body;
    const result: DtoInterface = await this.repo.login(req, payload);
    return Exception.baseResponse(req, res, result);
  }
})();
