const express = require('express');
const router = express.Router();

router.get(
  '/todo-collections/:userID',
  require('./routes/readTodoCollectionRoute')
);
router.put(
  '/todo-collections/:id/todo/:todoID',
  require('./routes/updateTodoRoute')
);
router.post('/todo-collections', require('./routes/createTodoCollectionRoute'));
router.post(
  '/todo-collections/:id',
  require('./routes/addTodoToCollectionRoute')
);
router.delete(
  '/todo-collections/:id',
  require('./routes/deleteTodoCollectionRoute')
);
router.delete(
  '/todo-collections/:id/todo',
  require('./routes/clearCompletedRoute')
);
router.delete(
  '/todo-collections/:id/todo/:todoID',
  require('./routes/deleteTodoRoute')
);

module.exports = router;
