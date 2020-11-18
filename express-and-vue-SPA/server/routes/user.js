const express = require('express');
const router = express.Router();
const { User } = require('../database/models');


router.get('/', (req, res, next) => {
  const user = {
    userId: req.user.id,
    userName: req.user.username,
  };
  return res.status(200).send({ user });
});

router.get('/all', async (req, res, next) => {
  const userList = await User.getAllUser();
  return res.status(200).send(userList);
});


module.exports = router;
