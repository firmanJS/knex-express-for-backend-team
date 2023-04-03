/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Request } from 'express'
import {
  RequestOptionsInterface, RequestOrderInterface, RequestQueryInterface,
  RequestQueryParamInterface, RequestSoftInterface
} from '../interface/request_interface'
import { LIMIT, PAGE } from './constant'

export const paging = (req: Request): RequestQueryInterface => {
  const page = Number(req?.query?.page) || PAGE
  const limit = Number(req?.query?.limit) || LIMIT
  const search = req?.query?.search as string || ''

  return {
    page, limit, search
  }
}

export const dynamicFilter = (req: Request, column: string[] = []): RequestQueryParamInterface => {
  const push: any = {}
  const asArray = Object.entries(req?.query)
  const filtered = asArray.filter(([key]) => column.includes(key))
  const newObject = Object.fromEntries(filtered)

  for (const prop in newObject) {
    if (prop) {
      push[prop] = newObject[prop]
    }
  }
  return push
}

export const dynamicOrder = (req: Request | any, defaultOrder: string[] = [])
: RequestOrderInterface => {
  let order: object
  const orders = req?.query?.order || defaultOrder[1]
  const direction = req?.query?.direction || defaultOrder[0]
  if (typeof orders === 'string' && typeof direction === 'string') {
    order = [
      { column: direction, order: orders }
    ]
  } else {
    const content = []
    for (const a in direction) {
      content.push({ column: direction[a], order: orders[a] })
    }
    order = content
  }

  return order
}

export const RequestRepoOptions = (options:RequestOptionsInterface | any, query:any):void | any => {
  if (options?.order && options?.order) {
    query.orderBy(options.order)
  }
  if (options?.filter?.limit) {
    query.limit(options.filter.limit)
  }
  if (options?.filter?.page && options?.filter?.limit) {
    query.offset(((options.filter.page - 1) * options.filter.limit))
  }

  return query
}

export const optionsPayload = (req: Request, typeMethod: string) : RequestSoftInterface => {
  const where: any = req?.params
  const payload = req?.body
  const options: RequestSoftInterface = {
    where,
    typeMethod,
    column: ['name'],
    payload
  }

  return options
}
