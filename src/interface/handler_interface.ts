/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

export default interface BaseHandlerInterface {
  store(req: Request, res: Response): Promise<Response>
  fetch(req: Request, res: Response): Promise<Response>
  fetchByParam(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
}
