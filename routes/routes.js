const routes = require('express').Router();
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinRouteValidation, signupRouteValidation } = require('../validator/sign/sign');
const { ERROR_DATA_CODE, ERROR_DATA_MESSAGE } = require('../constants/constants');
const errorHandler = require('../errors/errorHandler');

routes.post('/signin', signinRouteValidation, login);
routes.post('/signup', signupRouteValidation, createUser);

routes.use('/users', auth, usersRouter);
routes.use('/cards', auth, cardsRouter);

routes.use(errors());
routes.use(errorHandler);

routes.use('*', (req, res) => {
  res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_MESSAGE });
});

module.exports = routes;
