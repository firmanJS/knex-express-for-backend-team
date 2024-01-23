namespace Constant {
  export const LIMIT: number = 10;
  export const PAGE: number = 1;
  export const Environment: Record<string, string> = {
    DEV: 'development',
    STG: 'staging',
    PROD: 'production'
  };
  export const Http: Record<string, number> = {
    CREATED: 201,
    OK: 200,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
  };
  export const MORGAN_FORMAT: Record<string, string> = {
    DEV_FORMAT:
      '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m',
    PROD_FORMAT:
      '[:date[clf]] :remote-addr :remote-user :method :url :status :response-time(ms)'
  };
  export const Table: Record<string, string> = {
    TODO: 'mst_todo',
    BLOG: 'mst_blog',
    ARCHIVE_TODO: 'archive_todo',
    USERS: 'users',
    BLOG_CAT: 'mst_category_blog'
  };
  export const Method: Record<string, string> = {
    DEL: 'DELETE',
    PUT: 'PUT',
    POST: 'POST',
    GET: 'GET'
  };

  export const DATE_FORMAT: Record<string, string> = {
    ID: 'DD-MM-YYYY HH:mm:ss',
    LOG: 'YYYY-MM-DD HH:mm:ss'
  };
}

export = Constant;
