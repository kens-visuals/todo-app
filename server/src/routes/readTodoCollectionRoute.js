const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { userID } = req?.params;

  try {
    // const todosCollections = await TodosCollectionModel.find({ userID }).sort({
    //   createdAt: -1,
    // });

    // const todosCollections = await TodosCollectionModel.aggregate([
    //   { $match: { userID } },
    //   {
    //     $sort: {
    //       createdAt: -1, // Sort the TodosCollectionModel documents by their creation date in descending order
    //     },
    //   },
    // ]);

    // const todosCollections = await TodosCollectionModel.aggregate([
    //   { $match: { userID: String(userID) } },
    //   { $sort: { createdAt: -1 } },
    // ]);

    const todosCollections = await TodosCollectionModel.aggregate([
      { $match: { userID } },
      { $sort: { createdAt: -1 } },
    ]);

    console.log('todosCollections:', todosCollections);

    res.status(200).json(todosCollections);
  } catch (error) {
    console.error('Request Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
