const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const { cardsRouteValidation, cardsIdRouteValidation } = require('../validators/cards/cards');

cardsRouter.get('', getCards);
cardsRouter.post('', cardsRouteValidation, createCard);
cardsRouter.delete('/:id', cardsIdRouteValidation, deleteCard);
cardsRouter.put('/:id/likes', cardsIdRouteValidation, putCardLike);
cardsRouter.delete('/:id/likes', cardsIdRouteValidation, deleteCardLike);

module.exports = cardsRouter;
