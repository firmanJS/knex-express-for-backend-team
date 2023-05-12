/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { LogInterface } from '../../interface/entity_interface';
import { DtoInterface } from '../../interface/response_interface';

export interface AuthRequestInterface {
  username: string;
  email?: string;
  full_name?: string;
  password: string;
}

export interface AuthResponseInterface extends LogInterface {
  readonly id?: string;
  readonly username?: string;
  readonly email?: string;
  readonly full_name?: string;
  readonly password?: string;
  readonly salt?: string;
}

export interface AuthContractInterface {
  register(req: Request, payload: Record<string, string>): Promise<DtoInterface>;
  login(req: Request, payload: Record<string, string>): Promise<DtoInterface>;
}

export interface AuthHandlerInterface {
  register(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
}
