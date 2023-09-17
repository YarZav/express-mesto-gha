const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../../constants/constants');

const usersIdRouteValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const usersMeRouteValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const usersMeAvatarRoutevalidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp),
  }),
});

module.exports = { usersIdRouteValidation, usersMeRouteValidation, usersMeAvatarRoutevalidation };
