const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');
const router = express.Router();

// router.post('/login', require('./routes/loginRoute'));

router.get('/todo-collections', require('./routes/readTodoCollectionRoute'));
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
  '/todo-collections/:id/todo/:todoID',
  require('./routes/deleteTodoRoute')
);

module.exports = router;
