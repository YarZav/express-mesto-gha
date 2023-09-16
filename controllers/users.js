const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SUCCESS_CREATED_CODE = 201;
const ERROR_WRONG_PARAMETERS_CODE = 400;
const ERROR_AUTH_CODE = 401;
const ERROR_WRONG_DATA_CODE = 404;
const ERROR_WRONG_REQUEST_CODE = 500;

const ERROR_WRONG_PARAMETERS_MESSAGE = 'Переданы некорректные данные.';
const ERROR_WRONG_DATA_MESSAGE = 'Данные не найдены.';
const ERROR_WRONG_REQUEST_MESSAGE = 'Ошибка сервера.';

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
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

module.exports.getUsersMe = (req, res) => {
  jwt.verify(req.cookies.token, 'some-secret-key', (err, decodedToken) => {
    if (err) {
      res.status(ERROR_AUTH_CODE).send({ message: err.message });
    } else {
      req.userId = decodedToken._id;
      User.findById(decodedToken._id)
        .orFail()
        .then((user) => res.send({ data: user }))
        .catch((error) => {
          if (error.name === 'CastError') {
            res.status(ERROR_WRONG_PARAMETERS_CODE)
              .send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
          } else if (error.name === 'DocumentNotFoundError') {
            res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
          } else {
            res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
          }
        });
    }
  });
};

module.exports.createUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((passwordHash) => User.create({
      email,
      passwordHash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(SUCCESS_CREATED_CODE).send({ data: user }))
    .catch((error) => {
      console.log(error.name);
      if (error.name === 'ValidationError' || error.name === 'Error') {
        res.status(ERROR_WRONG_PARAMETERS_CODE)
          .send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};

module.exports.patchUsersMe = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then(() => res.send({ name, about }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_WRONG_PARAMETERS_CODE).send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};

module.exports.patchUsersMeAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then(() => res.send({ avatar }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_WRONG_PARAMETERS_CODE).send({ message: ERROR_WRONG_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_WRONG_DATA_CODE).send({ message: ERROR_WRONG_DATA_MESSAGE });
      } else {
        res.status(ERROR_WRONG_REQUEST_CODE).send({ message: ERROR_WRONG_REQUEST_MESSAGE });
      }
    });
};
