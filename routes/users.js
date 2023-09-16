const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUsersMe,
  patchUsersMe,
  patchUsersMeAvatar,
} = require('../controllers/users');

usersRouter.get('', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.get('/me', getUsersMe);
usersRouter.patch('/me', patchUsersMe);
usersRouter.patch('/me/avatar', patchUsersMeAvatar);

module.exports = usersRouter;
