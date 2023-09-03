const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardsRouter.get('*', getCards);
cardsRouter.post('*', createCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:id/likes', putCardLike);
cardsRouter.delete('/:id/likes', deleteCardLike);

module.exports = cardsRouter;
