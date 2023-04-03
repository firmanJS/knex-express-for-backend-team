export interface RequestQueryInterface {
  readonly page?: number
  readonly limit?: number
  readonly order?: string
  readonly direction?: string
  readonly search?: string
}

export interface RequestOptionsInterface {
  readonly where?: object | any
  readonly order?: object
  readonly filter?: object
  readonly type?: string
  readonly typeMethod?: string
  readonly id?: string
  readonly table?: string
  readonly column?: string | any
  readonly payload?: object | any
}

export interface ColumnReqInterface {
  readonly column: string;
  readonly order: string;
}

export interface RequestOrderInterface {
  readonly order?: ColumnReqInterface[]
}

export interface RequestQueryParamInterface {
  readonly [key: string]: Object[]
}

export interface RequestSoftInterface {
  readonly where?: Object[]
  readonly typeMethod?: string
  readonly column?: string[]
  readonly payload?: Object[]
}
