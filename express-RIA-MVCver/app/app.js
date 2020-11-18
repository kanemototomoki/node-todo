const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const todo = require('./routes/todo');
const session = require('express-session');
const csurf = require('csurf');
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

 // 以下を追加************************
 app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use(csurf());

app.use('/', (err, req, res, next) => {
  res.send(err);
});
// *********************************

app.use('/', todo);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
