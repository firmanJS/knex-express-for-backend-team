const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { baseResponse, customFormat } = require('../utils');

const router = express.Router();
const { index } = require('../static');
const { APP_ENV, APP_NAME } = require('../config');

const getDurationInMilliseconds = (start = process.hrtime()) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

router.get('/', (req, res) => {
  baseResponse(res, {
    data: {
      response_time: `${getDurationInMilliseconds()}(ms)`,
      welcome: APP_NAME,
      uptimes: process.uptime(),
      timestamp: customFormat(new Date().toISOString(), 'DD-MMM-YYYY HH:mm:ss'),
      documentation: `http://${req.get('host')}/documentation`
    }
  });
});

if (APP_ENV === 'development') {
  router.use('/documentation', swaggerUi.serve);
  router.get('/documentation', swaggerUi.setup(index, { isExplorer: false }));
}

module.exports = router;
