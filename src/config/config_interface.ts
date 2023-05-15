export interface Config {
  app: {
    name: string;
    env: string;
    language: string;
    port: number;
    permission_policy: string;
    protetcion: string;
    limit: string;
    method: [] | string;
    allow_header: [] | string;
    expose_header: [] | string;
    secret_key: string;
    jwt_expired: string;
    algorithm: string | any;
    refresh_token_expired: string;
  };
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
}