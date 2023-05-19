const express = require('express');
const { register, login } = require('./auth_handler');
const { registerValidation, loginValidation } = require('./auth_validation');

const router = express.Router();

/*
  DEFAULT ROUTE ENDPOINT USING HTTP VERB AND PLURAL NAMING
*/
router.post('/verify', loginValidation, login);
router.post('/register', registerValidation, register);

module.exports = router;
