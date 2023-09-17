const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const {
  cardsRouteValidation,
  cardsDeleteRouteValidation,
  cardsIdLikeRouteValidation,
  cardsIdDislikeRouteValidation,
} = require('../validator/cards/cards');

cardsRouter.get('', getCards);
cardsRouter.post('', cardsRouteValidation, createCard);
cardsRouter.delete('/:id', cardsDeleteRouteValidation, deleteCard);
cardsRouter.put('/:id/likes', cardsIdLikeRouteValidation, putCardLike);
cardsRouter.delete('/:id/likes', cardsIdDislikeRouteValidation, deleteCardLike);

module.exports = cardsRouter;
