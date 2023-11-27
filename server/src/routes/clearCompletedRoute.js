// const TodosCollectionModel = require('../models/TodosCollectionModel');

// module.exports = async (req, res) => {
//   const { id } = req?.params;

//   try {
//     let updateTodos, newTodos;
//     const collection = await TodosCollectionModel.findById(id);

//     if (!collection) {
//       return res.status(404).json({ error: 'Collection not found' });
//     }

//     updateTodos = collection.todos.filter((todo) => todo.completed === false);

//     // if (updateTodos.length === collection.todos.length) {
//     //   return res.status(400).json({ error: 'No completed todos to clear' });
//     // }
//     newTodos = await collection.save();
//     console.log('Todos Cleared:', newTodos);

//     res.status(200).json(newTodos);
//   } catch (error) {
//     console.error('Update and Delete Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const TodosCollectionModel = require('../models/TodosCollectionModel');

// module.exports = async (req, res) => {
//   const { id } = req?.params;

//   try {
//     const collection = await TodosCollectionModel.findById(id);

//     if (!collection) {
//       return res.status(404).json({ error: 'Collection not found' });
//     }

//     const updateTodos = collection.todos.filter(
//       (todo) => todo.completed === false
//     );

//     if (updateTodos.length === collection.todos.length) {
//       return res.status(400).json({ error: 'No completed todos to clear' });
//     }

//     const newTodos = await collection.save();
//     console.log('Todos Cleared:', newTodos);

//     res.status(200).json(newTodos);
//   } catch (error) {
//     console.error('Update and Delete Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const TodosCollectionModel = require('../models/TodosCollectionModel');

// module.exports = async (req, res) => {
//   const { id } = req?.params;

//   try {
//     let updateTodos;
//     const collection = await TodosCollectionModel.findById(id);

//     console.log(collection);

//     if (!collection) {
//       return res.status(404).json({ error: 'Collection not found' });
//     }

//     updateTodos = collection.todos.filter((todo) => todo.completed === true);

//     // if (updateTodos.length === collection.todos.length) {
//     //   return res.status(400).json({ error: 'No completed todos to clear' });
//     // }

//     const updatedCollection = await collection.save(); // Use a different variable

//     res.status(200).json(updatedCollection); // Send the updated collection
//   } catch (error) {
//     console.error('Update and Delete Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const TodosCollectionModel = require('../models/TodosCollectionModel');

module.exports = async (req, res) => {
  const { id } = req?.params;

  try {
    const collection = await TodosCollectionModel.findById(id);

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    const updateTodos = collection.todos.filter(
      (todo) => todo.completed === false
    );

    if (updateTodos.length === collection.todos.length) {
      return res.end();
    }

    collection.todos = updateTodos;
    await collection.save();

    res.status(200).json(updateTodos);
  } catch (error) {
    console.error('Update and Delete Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
