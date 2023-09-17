const routes = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const urlRegExp = require('../constants/constants');

const ERROR_WRONG_DATA_CODE = 404;
const ERROR_WRONG_DATA_MESSAGE = 'Данные не найдены.';

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegExp),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

routes.use('/users', auth, usersRouter);
routes.use('/cards', auth, cardsRouter);

routes.use(errors());

routes.use('*', (req, res) => {
  res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
});

module.exports = routes;
