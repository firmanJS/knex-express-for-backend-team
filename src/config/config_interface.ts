export interface Config {
  app: {
    name: string
    env: string
    language: string
    port: number,
    permission_policy: string
    protetcion: string
    limit: string
    method: []
    allow_header: []
    expose_header: []
  }
  db: {
    host: string
    port: number
    username: string
    password: string
    name: string
  }
}
