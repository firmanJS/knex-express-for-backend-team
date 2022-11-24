const todos = require('./todo.json')
const response = require('./response.json')

module.exports = {
  ...todos,
  ...response
}
