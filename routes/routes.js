const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (req, res) => {
  res.status(404).send({ message: 'Не правильно указан endpoint' });
});

module.exports = routes;
