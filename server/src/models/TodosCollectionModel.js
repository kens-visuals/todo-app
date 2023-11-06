const mongoose = require('mongoose');
const TodoModel = require('./TodoModel');

const todosCollectionShema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  todos: { type: [TodoModel.schema], default: [] },
});

const TodosCollectionModel = mongoose.model(
  'Collections',
  todosCollectionShema
);

module.exports = TodosCollectionModel;
