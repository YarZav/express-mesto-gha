const Card = require('../models/card');

const SUCCESS_UPDATED_CODE = 200;
const SUCCESS_CREATED_CODE = 201;
const ERROR_WRONG_PARAMETERS_CODE = 400;
const ERROR_OWNER_CODE = 403;
const ERROR_WRONG_DATA_CODE = 404;
const ERROR_WRONG_REQUEST_CODE = 500;

const ERROR_WRONG_PARAMETERS_MESSAGE = 'Переданы некорректные данные.';
const ERROR_WRONG_DATA_MESSAGE = 'Данные не найдены.';
const ERROR_OWNER_MESSAGE = 'Данные чужого пользователя';
const ERROR_WRONG_REQUEST_MESSAGE = 'Ошибка сервера.';

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
    });
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(SUCCESS_CREATED_CODE).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_WRONG_PARAMETERS_CODE).send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail()
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(req.params.id)
          .orFail()
          .then((deletedCard) => res.send({ data: deletedCard }));
      } else {
        res.status(ERROR_OWNER_CODE).send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_WRONG_PARAMETERS_CODE).send({ message: ERROR_OWNER_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};

module.exports.putCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(SUCCESS_CREATED_CODE).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_WRONG_PARAMETERS_CODE).send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};

module.exports.deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(SUCCESS_UPDATED_CODE).send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_WRONG_PARAMETERS_CODE).send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};
