const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id } = req?.params;

  try {
    const collection = await TodosCollectionModel.findById(id);

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    const updateTodos = collection.todos.filter(
      (todo) => todo.completed === false
    );

    if (updateTodos.length === collection.todos.length) {
      return res.end();
    }

    collection.todos = updateTodos;
    await collection.save();

    res.status(200).json(updateTodos);
  } catch (error) {
    console.error('Update and Delete Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
