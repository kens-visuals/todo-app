const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const { id } = req.params;

  const todo = await TodoModel.findById(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // if (
  //   req.body.text !== undefined &&
  //   req.body.text !== '' &&
  //   req.body.text !== todo.text
  // ) {
  // }

  // if (
  //   req.body.completed !== undefined &&
  //   req.body.completed !== todo.completed
  // ) {
  // }

  todo.text = req.body.text;
  todo.completed = req.body.completed;
  const updatedTodo = await todo.save();

  res.json(updatedTodo);
};
