const express = require('express')
const swaggerUi = require('swagger-ui-express')
const { baseResponse, fullDateFormatIndo } = require('../utils')

const router = express.Router()
const { index } = require('../static')

const getDurationInMilliseconds = (start = process.hrtime()) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

router.get('/', (req, res) => {
  baseResponse(res, {
    data: {
      response_time: `${getDurationInMilliseconds()}(ms)`,
      welcome: process?.env?.APP_NAME,
      uptimes: process.uptime(),
      timestamp: fullDateFormatIndo(new Date().toISOString()),
      documentation: `http://${req.get('host')}/documentation`
    }
  })
})
if (process?.env?.NODE_ENV === 'development') {
  router.use('/documentation', swaggerUi.serve)
  router.get('/documentation', swaggerUi.setup(index, { isExplorer: false }))
}

module.exports = router
