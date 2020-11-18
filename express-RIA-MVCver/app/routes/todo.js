const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');
const { csrfProtection } = require('../middleware/csrf');

router.use(csrfProtection);

router
  .get('/todo', todoController.getAllTodo)
  .post('/todo', todoController.addTodo);

router
  .get('/todo/:id', todoController.getTodoById)
  .put('/todo/:id', todoController.updateTodoById)
  .delete('/todo/:id', todoController.deleteTodoById);

// `app.js` で使うためにモジュール化する
module.exports = router;
