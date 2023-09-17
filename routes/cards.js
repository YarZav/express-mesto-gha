const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const urlRegExp = require('../constants/constants');

cardsRouter.get('', getCards);
cardsRouter.post(
  '',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegExp),
    }),
  }),
  createCard,
);
cardsRouter.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);
cardsRouter.put(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  putCardLike,
);
cardsRouter.delete(
  '/:id/likes',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCardLike,
);

module.exports = cardsRouter;
