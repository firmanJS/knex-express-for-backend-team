/* eslint-disable no-unused-vars */
import { Request } from 'express';
import { RequestOptionsInterface } from './request.interface';
import { DtoInterface } from './response.interface';

export interface RepositoryInterface {
  create?(req: Request, payload: object): Promise<DtoInterface>;
  get?(req: Request, options: RequestOptionsInterface): Promise<DtoInterface>;
  getByParam?(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface>;
  update?(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface>;
  destroy?(
    req: Request,
    options: RequestOptionsInterface
  ): Promise<DtoInterface>;
}

export interface CountInterface {
  readonly count?: number;
}
