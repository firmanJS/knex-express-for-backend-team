const express = require('express');
const { register, login, refreshToken } = require('./auth_handler');
const { registerValidation, loginValidation } = require('./auth_validation');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

/*
  DEFAULT ROUTE ENDPOINT USING HTTP VERB AND PLURAL NAMING
*/
router.post('/verify', loginValidation, login);
router.post('/register', registerValidation, register);
router.post('/refresh-token', verifyToken, refreshToken);

module.exports = router;
