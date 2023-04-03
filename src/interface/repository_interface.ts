/* eslint-disable no-unused-vars */
import { Request } from 'express'
import { RequestOptionsInterface } from './request_interface'
import { DtoInterface } from './response_interface'

export interface RepositoryInterface {
  create(req: Request, payload: object): Promise<DtoInterface>
  get(req: Request, options: RequestOptionsInterface): Promise<DtoInterface>
  getByParam(req: Request, options: RequestOptionsInterface): Promise<DtoInterface>
  update(req: Request, options: RequestOptionsInterface): Promise<DtoInterface>
  COLUMN(): string[]
  SORT(): string[]
}

export interface CountInterface {
  readonly count?: number
}
