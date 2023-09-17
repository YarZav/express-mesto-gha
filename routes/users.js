const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUsersMe,
  patchUsersMe,
  patchUsersMeAvatar,
} = require('../controllers/users');
const { usersIdRouteValidation, usersMeRouteValidation, usersMeAvatarRoutevalidation } = require('../validators/users/users');

usersRouter.get('', getUsers);
usersRouter.get('/me', getUsersMe);
usersRouter.get('/:id', usersIdRouteValidation, getUser);
usersRouter.patch('/me', usersMeRouteValidation, patchUsersMe);
usersRouter.patch('/me/avatar', usersMeAvatarRoutevalidation, patchUsersMeAvatar);

module.exports = usersRouter;
