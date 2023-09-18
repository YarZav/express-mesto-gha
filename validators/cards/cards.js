const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../../constants/constants');

const cardsRouteValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
});

const cardsIdRouteValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = { cardsRouteValidation, cardsIdRouteValidation };
