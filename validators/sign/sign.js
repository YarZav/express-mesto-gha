const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../../constants/constants');

const signinRouteValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupRouteValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = { signinRouteValidation, signupRouteValidation };
