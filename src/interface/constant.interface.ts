namespace ConstantContract {
  export interface Environment {
    readonly DEV: string;
    readonly STG: string;
    readonly PROD: string;
  }

  export interface Http {
    readonly CREATED: number;
    readonly OK: number;
    readonly ACCEPTED: number;
    readonly BAD_REQUEST: number;
    readonly UNAUTHORIZED: number;
    readonly FORBIDDEN: number;
    readonly NOT_FOUND: number;
    readonly UNPROCESSABLE_ENTITY: number;
    readonly INTERNAL_SERVER_ERROR: number;
  }

  export interface MorganFormat {
    readonly DEV_FORMAT: string;
    readonly PROD_FORMAT: string;
  }

  export interface Table {
    readonly TODO: string;
    readonly BLOG: string;
    readonly ARCHIVE_TODO: string;
    readonly USERS: string;
    readonly BLOG_CAT: string;
  }

  export interface Method {
    readonly DEL: string;
    readonly PUT: string;
    readonly POST: string;
    readonly GET: string;
  }

  export interface DateFormat {
    readonly ID: string;
    readonly LOG: string;
  }
}

export = ConstantContract;
