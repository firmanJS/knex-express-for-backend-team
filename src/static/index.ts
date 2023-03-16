import config from "../config"

const info: object = {
  description: 'This is API , Made with ❤ by <a href="https://github.com/firmanJS" target="_blank">@firmanjs.</a>',
  version: '1.0.0',
  title: `API Documentation For ${config?.app?.name}`,
  contact: {
    email: ''
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  }
}

const servers: object = [
  {
    url: '/api/v1/',
    description: 'Development server'
  }
  // {
  //   url: 'https://balailelang-api-gateway.d.logique.co.id/',
  //   description: 'Gateway server'
  // }
]

// const paths = require('./path')
// const schemas = require('./schema')

export const swaggerInit: object = {
  openapi: '3.0.0',
  info,
  servers,
  // paths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    // schemas
  }
}
