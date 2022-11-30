const response = require('./response.json')
const todos = require('./todo.json')
const staff = require('./staff.json')

module.exports = {
  ...response,
  ...todos,
  ...staff
}
