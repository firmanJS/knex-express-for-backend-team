const express = require('express')
const {
  store, fetch, fetchByParam, update, softDelete
} = require('./handler')
const { postValidation, putValidation } = require('./validation')
const { idMustBeUuid } = require('../../middlewares')

const router = express.Router()

/*
  DEFAULT ROUTE ENDPOINT USING HTTP VERB AND PLURAL NAMING
*/
router.post('/', postValidation, store)
router.get('/', fetch)
router.get('/:id', idMustBeUuid, fetchByParam)
router.put('/:id', idMustBeUuid, putValidation, update)
router.delete('/:id', idMustBeUuid, softDelete)

module.exports = router
