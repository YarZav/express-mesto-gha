const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send());
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(500).send();
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.body.id)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Карточка с указанным ${req.params.id} не найдена.` });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(500).send());
};

module.exports.putCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.body.id, { $addToSet: { likes: owner } })
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Передан несуществующий ${req.body.id} карточки` });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(500).send());
};

module.exports.deleteCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.body.id, { $pull: { likes: owner } })
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Передан несуществующий ${req.body.id} карточки` });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(500).send());
};
