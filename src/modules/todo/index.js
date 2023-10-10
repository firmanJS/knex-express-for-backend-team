const express = require('express');
const { store, fetch, fetchByParam, update } = require('./todo_handler');
const { postValidation, putValidation } = require('./todo_validation');
const { idMustBeUuid } = require('../../middlewares');

const router = express.Router();

/*
  DEFAULT ROUTE ENDPOINT USING HTTP VERB AND PLURAL NAMING
*/
router.post('/', postValidation, store);
router.get('/', fetch);
router.get('/:id', idMustBeUuid, fetchByParam);
router.put('/:id', idMustBeUuid, putValidation, update);
router.delete('/:id', idMustBeUuid, update);

module.exports = router;
