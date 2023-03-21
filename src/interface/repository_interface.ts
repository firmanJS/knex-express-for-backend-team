import { DtoInterface } from './response_interface'
import { Request } from 'express'

export interface RepositoryInterface {
  create(req: Request, payload: object): Promise<DtoInterface>
  get(req: Request, options: object): Promise<DtoInterface>
  getByParam(req: Request, options: object): Promise<DtoInterface>
  update(req: Request, options: object): Promise<DtoInterface>
  COLUMN(): string[]
  SORT(): string[]
}

export interface CountInterface {
  readonly count?: number
}
