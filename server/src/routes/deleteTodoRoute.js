const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id, todoID } = req?.params;

  console.log('id:', id);
  console.log('todoID:', todoID);

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

    // const updatedCollection = await TodosCollectionModel.findOneAndUpdate(
    //   { _id: id },
    //   { $pull: { todos: { _id: todoID } } },
    //   { new: true, filter: false }
    // );
    // if (!updatedCollection) {
    //   return res.status(404).json({ error: 'Collection not found' });
    // }
    // console.log('Todo removed:', updatedCollection);
    // res.status(200).json(updatedCollection);
  } catch (error) {
    console.error('Update and Delete Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
