const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { title, todos } = req?.body;

  const todosCollection = new TodosCollectionModel({ title, todos });

  const newTodosCollection = await todosCollection.save();

  res.status(200).json(newTodosCollection);
};
