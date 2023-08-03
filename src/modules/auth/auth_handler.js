/**
 *
 * @param {*} lang this is for consisent with other language message
 * @param {*} repository this is repository for postgres definition
 * @param {*} req express request you can see with console.log(req)
 * @param {*} res express response you can see with console.log(req)
 * @param {*} isCreated if request body need users id in token, you can use this
 * @return {JSON}
*/

const repository = require('./auth_repository');
const {
  baseResponse, generatePassword
} = require('../../utils');

exports.register = async (req, res) => {
  const payload = generatePassword(req?.body);
  delete payload.password_confirmation;
  const result = await repository.register(req, payload);
  return baseResponse(res, result);
};

exports.login = async (req, res) => {
  const payload = req?.body;
  const result = await repository.login(req, payload);
  return baseResponse(res, result);
};

exports.refreshToken = async (req, res) => {
  const result = await repository.refreshToken(req);
  return baseResponse(res, result);
};
