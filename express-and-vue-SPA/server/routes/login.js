const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // 何かしらのエラー
    if (err) {
      return next(err);
    }

    // 一致するユーザーがいない
    if (!user) {
      const statusCode = 401;
      return res.status(statusCode).send(info);
    }

    // login成功
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      const statusCode = 200;
      return res.status(statusCode).send({
        userName: user.username,
        userId: user.id,
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).send();
});

module.exports = router;
