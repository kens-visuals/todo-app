const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const { text } = req?.body;

  const todo = new TodoModel({ text, completed: false });

  const newTodos = await todo.save();

  res.status(200).json(newTodos);
};
