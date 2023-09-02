const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:id', deleteCard);
cardsRouter.put('/cards/:id/likes', putCardLike);
cardsRouter.delete('/cards/:id/likes', deleteCardLike);

module.exports = cardsRouter;
