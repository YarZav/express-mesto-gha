const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

routes.use('/', usersRouter);
routes.use('/', cardsRouter);

module.exports = routes;
