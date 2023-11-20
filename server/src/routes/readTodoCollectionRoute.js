const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { userID } = req?.params;

  try {
    const todosCollections = await TodosCollectionModel.aggregate([
      { $match: { userID } },
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json(todosCollections);
  } catch (error) {
    console.error('Request Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
