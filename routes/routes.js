const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const ERROR_WRONG_DATA_CODE = 404;
const ERROR_WRONG_DATA_MESSAGE = 'Данные не найдены.';

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use('/users', auth, usersRouter);
routes.use('/cards', auth, cardsRouter);

routes.use('*', (req, res) => {
  res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
});

module.exports = routes;
