const express = require('express');
const todos = require('../../modules/todos');
const staffs = require('../../modules/staff');

const routing = express();
const API_TAG = '/api/v1';
/* RULE
naming convention endpoint: using plural
*/
routing.use(`${API_TAG}/todo`, todos);
routing.use(`${API_TAG}/staff`, staffs);
module.exports = routing;
