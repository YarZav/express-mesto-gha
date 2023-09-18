const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinRouteValidation, signupRouteValidation } = require('../validators/sign/sign');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');

routes.post('/signin', signinRouteValidation, login);
routes.post('/signup', signupRouteValidation, createUser);

routes.use('/users', auth, usersRouter);
routes.use('/cards', auth, cardsRouter);

routes.use('*', (req, res, next) => {
  next(new DocumentNotFoundError('Неправильный путь'));
});

module.exports = routes;
