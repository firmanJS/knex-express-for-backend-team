const express = require('express')
const {
  store, fetch, fetchByParam, update
} = require('./staff_handler')
const { postValidation, putValidation } = require('./staff_validation')
const { idMustBeUuid } = require('../../middlewares')

const router = express.Router()

/*
  DEFAULT ROUTE ENDPOINT USING HTTP VERB AND PLURAL NAMING
*/
router.post('/', postValidation, store)
router.get('/', fetch)
router.get('/:id', idMustBeUuid, fetchByParam)
router.put('/:id', idMustBeUuid, putValidation, update)
router.delete('/:id', idMustBeUuid, update)

module.exports = router
