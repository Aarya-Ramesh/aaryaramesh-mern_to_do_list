const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted
} = require('../controllers/todoController');

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/clear-completed')
  .delete(clearCompleted);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

router.route('/:id/toggle')
  .patch(toggleTodo);

module.exports = router;
