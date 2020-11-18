const { Todo } = require('../database/models');

module.exports = {
  getAllTodo: async (req, res, next) => {
    const todoList = await Todo.getAllTodo();
    res.render('index.ejs', {
      templateName: 'page/home.ejs',
      todoList,
      csrfToken: req.session.csrfToken,
    });
  },
  getTodoById: async (req, res, next) => {
    const todo = await Todo.getTodo(req.params.id);
    res.render('index.ejs', {
      templateName: 'page/detail.ejs',
      todo,
      csrfToken: req.session.csrfToken,
    });
  },
  addTodo: async (req, res, next) => {
    const params = {
      title: req.body['todo-title'],
      content: req.body['todo-content'],
    };
    await Todo.addTodo(params);
    res.redirect('/todo');
  },
  updateTodoById: async (req, res, next) => {
    const params = {
      id: req.params.id,
      title: req.body['todo-title'],
      content: req.body['todo-content'],
    };
    await Todo.updateTodo(params);
    res.redirect('/todo');
  },
  deleteTodoById: async (req, res, next) => {
    await Todo.deleteTodo(req.params.id);
    res.redirect('/todo');
  },
}
