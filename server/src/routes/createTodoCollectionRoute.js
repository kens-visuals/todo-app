const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { title, userID } = req?.body;

  const todosCollection = new TodosCollectionModel({ title, userID });

  const newTodosCollection = await todosCollection.save();

  res.status(200).json(newTodosCollection);
};
