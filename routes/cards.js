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
cardsRouter.delete('/cards', deleteCard);
cardsRouter.put('/cards/likes', putCardLike);
cardsRouter.delete('/cards/likes', deleteCardLike);

module.exports = cardsRouter;
