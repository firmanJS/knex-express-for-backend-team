const todos = require('./todo.json')
const staff = require('./staff.json')

module.exports = {
  ...todos,
  ...staff
}
