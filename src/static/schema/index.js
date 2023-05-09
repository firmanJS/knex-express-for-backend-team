/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../schema');
const readFile = fs.readdirSync(directory);
const schemas = readFile.map((r) => {
  const replaceFile = r.replace('.json', '');
  const req = require(`./${replaceFile}`);
  return req;
});
module.exports = Object.assign({}, ...schemas);
