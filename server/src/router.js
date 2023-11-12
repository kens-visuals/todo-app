const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');
const router = express.Router();

// router.post('/login', require('./routes/loginRoute'));
router.post('/signup', require('./routes/signupRoute'));
router.post('/login', require('./routes/loginRoute'));

router.get(
  '/todo-collections',
  isLoggedIn,
  require('./routes/readTodoCollectionRoute')
);
router.put(
  '/todo-collections/:id/todo/:todoID',
  isLoggedIn,
  require('./routes/updateTodoRoute')
);
router.post(
  '/todo-collections',
  isLoggedIn,
  require('./routes/createTodoCollectionRoute')
);
router.post(
  '/todo-collections/:id',
  isLoggedIn,
  require('./routes/addTodoToCollectionRoute')
);
router.delete(
  '/todo-collections/:id',
  isLoggedIn,
  require('./routes/deleteTodoCollectionRoute')
);
router.delete(
  '/todo-collections/:id/todo/:todoID',
  isLoggedIn,
  require('./routes/deleteTodoRoute')
);

module.exports = router;
