const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUsersMe,
  patchUsersMe,
  patchUsersMeAvatar,
} = require('../controllers/users');

usersRouter.get('', getUsers);
usersRouter.get('/me', getUsersMe);
usersRouter.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);
usersRouter.patch('/me', patchUsersMe);
usersRouter.patch('/me/avatar', patchUsersMeAvatar);

module.exports = usersRouter;
