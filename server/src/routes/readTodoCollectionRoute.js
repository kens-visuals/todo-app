const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  try {
    const todosCollections = await TodosCollectionModel.aggregate([
      {
        $sort: {
          createdAt: -1, // Sort the TodosCollectionModel documents by their creation date in descending order
        },
      },
    ]);

    res.status(200).json(todosCollections);
  } catch (error) {
    console.error('Request Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
