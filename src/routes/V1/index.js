const express = require('express');
const todos = require('../../modules/todo');

const routing = express();
const API_TAG = '/api/v1';
/* RULE
naming convention endpoint: using plural
*/
routing.use(`${API_TAG}/todo`, todos);
module.exports = routing;
