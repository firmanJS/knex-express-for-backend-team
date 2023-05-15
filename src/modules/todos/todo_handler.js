/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} reqParams if request condition is and operator, you can use this
 * @return {JSON}
*/

const repository = require('./todo_repository');
const {
  baseResponse, paginationResponse, reqParam, dynamicFilter, paging,
  dynamicOrder, optionsPayload, updateType, isCreated
} = require('../../utils');

const store = async (req, res) => {
  const payload = isCreated(req);
  const result = await repository.create(req, payload);
  return baseResponse(res, result);
};

const fetch = async (req, res) => {
  const where = dynamicFilter(req, repository.COLUMN);
  const filter = paging(req, repository.DEFAULT_SORT);
  const order = dynamicOrder(filter);
  const options = {
    where, order, filter, type: 'array'
  };
  const result = await repository.get(req, options);
  return paginationResponse(req, res, result);
};

const fetchByParam = async (req, res) => {
  const where = reqParam(req);
  const options = { where };
  const result = await repository.getByParam(req, options);
  return baseResponse(res, result);
};

const update = async (req, res) => {
  const options = optionsPayload(req, updateType(req), ['name']);
  const result = await repository.update(req, options);
  return baseResponse(res, result);
};

module.exports = {
  store,
  fetch,
  fetchByParam,
  update
};
