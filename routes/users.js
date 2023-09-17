const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUsersMe,
  patchUsersMe,
  patchUsersMeAvatar,
} = require('../controllers/users');
const urlRegex = require('../constants/constants');

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
usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  patchUsersMe,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegex),
    }),
  }),
  patchUsersMeAvatar,
);

module.exports = usersRouter;
