const Card = require('../models/card');
const {
  ERROR_USER_CODE,
  ERROR_PARAMETERS_MESSAGE,
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

module.exports.deleteCard = (req, res, next) => {
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
    .catch(next);
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
