/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} isCreated if request body need users id in token, you can use this
 * @return {JSON}
*/

const repository = require('./todo_repository');
const {
  baseResponse, paginationResponse, dynamicFilter, paging,
  dynamicOrder, optionsPayload, updateType,
} = require('../../utils');

exports.store = async (req, res) => {
  // const payload = isCreated(req);
  const payload = req?.body;
  const result = await repository.create(req, payload);
  return baseResponse(res, result);
};

exports.fetch = async (req, res) => {
  const where = dynamicFilter(req, repository.COLUMN);
  const filter = paging(req, repository.DEFAULT_SORT);
  const order = dynamicOrder(filter);
  const options = {
    where, order, filter, type: 'array'
  };
  const result = await repository.get(req, options);
  return paginationResponse(req, res, result);
};

exports.fetchByParam = async (req, res) => {
  const where = req?.params;
  const options = { where };
  const result = await repository.getByParam(req, options);
  return baseResponse(res, result);
};

exports.update = async (req, res) => {
  const options = optionsPayload(req, updateType(req), ['name']);
  const result = await repository.update(req, options);
  return baseResponse(res, result);
};
