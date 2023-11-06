const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id } = req?.params;

  const todosCollection = await TodosCollectionModel.findByIdAndRemove(id);

  res.status(204).json(todosCollection);
};
