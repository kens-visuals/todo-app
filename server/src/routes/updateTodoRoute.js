const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id, todoID } = req.params;
  const { text, completed } = req.body;

  try {
    const updateFields = {};

    if (text !== undefined) {
      updateFields['todos.$.text'] = text;
    }

    if (completed !== undefined) {
      updateFields['todos.$.completed'] = completed;
    }

    const updatedCollection = await TodosCollectionModel.findOneAndUpdate(
      { _id: id, 'todos._id': todoID },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    return res.json(updatedCollection);
  } catch (error) {
    console.error('Update Collection Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
