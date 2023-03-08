
export interface ResponseInterface {
  status?: boolean,
  message?: string,
  data?: any | []
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

// export interface NumberResponseInterface {
//   [name: string]: number
// }

export interface DeletedResponseInterface {
  deletedCount: number
}

export interface UpdatedResponseInterface {
  acknowledged?: boolean,
  modifiedCount: number,
  upsertedId?: unknown,
  upsertedCount?: number,
  matchedCount?: number
}

export interface DataInterface {
  data?: object
}
