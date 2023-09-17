const routes = require('express').Router();
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinRouteValidation, signupRouteValidation } = require('../validators/sign/sign');
const errorHandler = require('../errors/errorHandler');
const NotFoundError = require('../errors/NotFoundError');

routes.post('/signin', signinRouteValidation, login);
routes.post('/signup', signupRouteValidation, createUser);

routes.use('/users', auth, usersRouter);
routes.use('/cards', auth, cardsRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

routes.use(errors());
routes.use(errorHandler);

module.exports = routes;
