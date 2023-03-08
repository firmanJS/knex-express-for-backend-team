export interface Config {
  app: {
    name: string
    env: string
    port: number
  }
  db: {
    host: string
    port: number
    username: string
    password: string
    name: string
  }
}
