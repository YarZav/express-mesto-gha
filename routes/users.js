const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  patchUsersMe,
  patchUsersMeAvatar,
} = require('../controllers/users');

usersRouter.get('*', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('*', createUser);
usersRouter.patch('/me', patchUsersMe);
usersRouter.patch('/me/avatar', patchUsersMeAvatar);

module.exports = usersRouter;
