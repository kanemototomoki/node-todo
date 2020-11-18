const express = require('express');
const router = express.Router();
const { Todo } = require('../database/models');

router.use('/test', (req, res, next) => {
  return res.send({ message: 'hellooooooooooooooo' });
});

router.get('/', async (req, res) => {
  const todoList = await Todo.getTodoList(req.user.id);
  return res.status(200).send(todoList);
});

router.post('/', async (req, res) => {
  const param = {
    title: req.body.title,
    content: req.body.content,
    isCompleted: false,
    userId: req.user.id,
  };

  await Todo.addTodo(param);
  res.status(200).send();
});

router.put('/:id', async (req, res) => {
  const param = {
    title: req.body.title,
    content: req.body.content,
    isCompleted: req.body.isCompleted,
    id: req.body.id,
  };

  await Todo.updateTodo(param);
  return res.status(200).send();
});

router.delete('/:id', async (req, res) => {
  await Todo.deleteTodo(req.params.id);
  return res.status(200).send();
});

module.exports = router;
