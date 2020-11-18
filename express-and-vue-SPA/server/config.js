const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const api = require('./routes/api.js');

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    secret: 'my-secret-word',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 604800000ms = 7日
      // maxAge: 15000,                // 15000ms = 15秒
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  require('./middleware/auth.js')(passport);

  app.use('/api', api);
}
