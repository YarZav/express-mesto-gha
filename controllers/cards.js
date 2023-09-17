const Card = require('../models/card');
const {
  ERROR_PARAMETERS_CODE,
  ERROR_USER_CODE,
  ERROR_DATA_CODE,
  ERROR_SERVER_CODE,
  ERROR_PARAMETERS_MESSAGE,
  ERROR_DATA_MESSAGE,
  ERROR_USER_MESSAGE,
  ERROR_SERVER_MESSAGE,
} = require('../constants/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
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
        res.status(ERROR_USER_CODE).send({ message: ERROR_PARAMETERS_MESSAGE });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_PARAMETERS_CODE).send({ message: ERROR_USER_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_MESSAGE });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch(next);
};
