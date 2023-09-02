const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  patchUsersMe,
  patchUsersMeAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', patchUsersMe);
usersRouter.patch('/users/me/avatar', patchUsersMeAvatar);

module.exports = usersRouter;
