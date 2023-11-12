"use strict";

var express = require('express');

var isLoggedIn = require('./middleware/isLoggedIn');

var router = express.Router();
router.post('/login', require('./routes/loginRoute'));
router.get('/todos', isLoggedIn, require('./routes/readTodosRoute'));
router.get('/todo-collections', isLoggedIn, require('./routes/readTodoCollectionRoute'));
router.post('/todos', isLoggedIn, require('./routes/createTodoRoute'));
router.put('/todos/:id', isLoggedIn, require('./routes/updateTodoRoute'));
router["delete"]('/todos/:id', isLoggedIn, require('./routes/deleteTodoRoute'));
router.post('/todo-collections', require('./routes/createTodoCollectionRoute'));
router["delete"]('/todo-collections/:id', isLoggedIn, require('./routes/deleteTodoCollectionRoute'));
module.exports = router;