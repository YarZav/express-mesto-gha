const usersRouter = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.post('/users', createUser);

module.exports = usersRouter;
