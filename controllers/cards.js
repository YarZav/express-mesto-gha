const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((error) => res.status(500).send({ message: `Не удалось найти карточки ${error}` }));
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((error) => res.status(500).send({ message: `Не удалось создать карточку ${error}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.body.id)
    .then((card) => res.send({ data: card }))
    .catch((error) => res.status(500).send({ message: `Не удалось удалить карточку ${error}` }));
};

module.exports.putCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.body.id, { $addToSet: { likes: owner } })
    .then((card) => res.send({ data: card }))
    .catch((error) => res.status(500).send({ message: `Не удалось лайкнуть карточку ${error}` }));
};

module.exports.deleteCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.body.id, { $pull: { likes: owner } })
    .then((card) => res.send({ data: card }))
    .catch((error) => res.status(500).send({ message: `Не удалось лайкнуть карточку ${error}` }));
};
