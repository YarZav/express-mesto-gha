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
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Карточка с указанным ${req.params.id} не найдена.` });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при лайке карточки.' }));
};

module.exports.putCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Карточка с указанным ${req.params.id} не найдена.` });
      } else {
        res.status(201).send(card);
      }
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при лайке карточки.' }));
};

module.exports.deleteCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: `Карточка с указанным ${req.params.id} не найдена.` });
      } else {
        res.status(200).send(card);
      }
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при лайке карточки.' }));
};
