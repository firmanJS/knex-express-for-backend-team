/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../path');
const readFile = fs.readdirSync(directory)
const paths = readFile.map((r) => {
  const replaceFile = r.replace('.json', '')
  const req = require(`./${replaceFile}`)
  return req
})
module.exports = Object.assign({}, ...paths)
