const express = require('express');
const auths = require('../../modules/auth');
const todos = require('../../modules/todo');
const { verifyToken } = require('../../middlewares');
const { useGzip } = require('../../utils');

const routing = express();
const API_TAG = '/api/v1';
/* RULE
naming convention endpoint: using plural
*/
routing.disable('x-powered-by');
routing.use(useGzip());
routing.use(`${API_TAG}/auth`, auths);
routing.use(`${API_TAG}/todo`, verifyToken, todos);
module.exports = routing;
