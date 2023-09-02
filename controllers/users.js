const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send({ message: `Не удалось найти пользователей ${error}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: `Не удалось найти пользователя ${error}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: `Не удалось создать пользователя ${error}` }));
};

module.exports.patchUsersMe = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: `Не удалось обновить пользователя ${error}` }));
};

module.exports.patchUsersMeAvatar = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => res.status(500).send({ message: `Не удалось обновить пользователя ${error}` }));
};
