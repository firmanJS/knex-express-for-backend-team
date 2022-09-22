const express = require('express')
const colors = require('../../modules/colors')
const routing = express();
const API_TAG = '/api/v1';
/* RULE
naming convention endpoint: using plural
*/
routing.use(`${API_TAG}/colors`, verifyToken, colors)
module.exports = routing;
