
export interface ResponseInterface {
  status: boolean,
  message: string,
  exception?: string,
  data: any | []
}
interface MetaInterface {
  current_page?: number,
  page?: number
  limit_per_page?: number
  total_page?: number
  count_total?: number
}

export interface WithMetaInterface extends ResponseInterface {
  _link?: string,
  meta?: MetaInterface
}

export interface PaginationResponseInterface {
  rows: object,
  count: number,
}

export interface ResultBoolInterface {
  status?: boolean
}

export interface DeletedResponseInterface {
  deletedCount: number
}

export interface DtoInterface {
  code?: number,
  data?: ResponseInterface
}

export interface DataInterface {
  data?: object
}
