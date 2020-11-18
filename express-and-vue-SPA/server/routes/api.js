const express = require('express');
const router = express.Router();
const login = require('./login.js');
const todo = require('./todo.js');
const user = require('./user.js');
const checkAuthentication = require('../middleware/checkAuthentication.js');

router.use('/', login)
      .use('/todo', checkAuthentication, todo)
      .use('/user', checkAuthentication, user);

module.exports = router;
