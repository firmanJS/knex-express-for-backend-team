const database = require('./database');
const environment = require('./environment');

module.exports = {
  ...database,
  ...environment
};
