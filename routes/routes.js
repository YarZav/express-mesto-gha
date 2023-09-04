const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const ERROR_WRONG_DATA_CODE = 404;
const ERROR_WRONG_DATA_MESSAGE = 'Данные не найдены.';

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (req, res) => {
  res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
});

module.exports = routes;
