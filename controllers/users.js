const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Не удается обработать запрос' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: `Пользователь по указанному ${req.params.id} не найден.` });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при получении пользователя.' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Не удается обработать запрос' });
      }
    });
};

module.exports.patchUsersMe = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: `Пользователь по указанному ${req.params.id} не найден.` });
      } else {
        res.send({ name, about });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(500).send({ message: 'Не удается обработать запрос' });
      }
    });
};

module.exports.patchUsersMeAvatar = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: `Пользователь по указанному ${req.params.id} не найден.` });
      } else {
        res.send({ avatar });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(500).send({ message: 'Не удается обработать запрос' });
      }
    });
};
