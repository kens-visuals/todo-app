const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id, todoID } = req?.params;

  try {
    const updatedCollection = await TodosCollectionModel.findById(id);

    if (!updatedCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    updatedCollection.todos = updatedCollection.todos.filter(
      (todo) => todo._id.toString() !== todoID
    );

    const newTodos = await updatedCollection.save();

    res.status(200).json(newTodos);
  } catch (error) {
    console.error('Update and Delete Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
