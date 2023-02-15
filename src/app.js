const express = require('express')

const app = express()
const compress = require('compression')
const methodOverride = require('method-override')
const xss = require('xss-clean')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {
  notFoundHandler,
  errorHandler,
  removeFavicon,
  MORGAN_FORMAT,
  syntaxError,
} = require('./utils')

const healthCheck = require('./routes')
const apiV1 = require('./routes/V1')
const {
  APP_ENV, APP_LIMIT, APP_METHOD, APP_EXPOSE_HEADER, APP_PERMISSION_POLICY, APP_PROTECTION,
  APP_ALLOW_HEADER
} = require('./config')

app.use(helmet.hidePoweredBy())
app.use(helmet())
app.use((_req, res, next) => {
  res.setHeader('Permissions-Policy', APP_PERMISSION_POLICY)
  res.setHeader('X-XSS-Protection', APP_PROTECTION)
  next()
})
app.use(cors({
  methods: APP_METHOD,
  allowedHeaders: APP_ALLOW_HEADER,
  exposedHeaders: APP_EXPOSE_HEADER
})) // cors setup

app.use(compress()) // gzip compression
app.use(methodOverride()) // lets you use HTTP verbs
app.use(xss()) // handler xss attack
app.use(express.json({ limit: APP_LIMIT })) // json limit
if (APP_ENV === 'production') {
  app.use(morgan(MORGAN_FORMAT.PROD))
} else {
  app.use(morgan(MORGAN_FORMAT.DEV, { stream: process.stderr }))
}
app.use(healthCheck) // routing
app.use(apiV1) // routing
app.use('/public', express.static('public')) // for public folder
app.use(notFoundHandler) // 404 handler
app.use(errorHandler) // error handlerr
app.use(syntaxError) // error handlerr syntax
app.use(removeFavicon)
module.exports = app
