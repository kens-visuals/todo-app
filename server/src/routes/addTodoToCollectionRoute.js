const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id } = req?.params;
  const { todo } = req?.body;

  try {
    const todosCollection = await TodosCollectionModel.findOne({ _id: id });

    if (!todosCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    todosCollection.todos.push(todo);

    const newTodos = await todosCollection.save();

    res.status(200).json(newTodos);
  } catch (error) {
    console.error('Update and Save Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
