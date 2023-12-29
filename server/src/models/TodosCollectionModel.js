const mongoose = require('mongoose');
const TodoModel = require('./TodoModel');

const todosCollectionShema = new mongoose.Schema(
  {
    title: String,
    userID: { type: String, required: true },
    todos: { type: [TodoModel.schema], default: [] },
  },
  { timestamps: true }
);

const TodosCollectionModel = mongoose.model(
  'Collections',
  todosCollectionShema
);

module.exports = TodosCollectionModel;
