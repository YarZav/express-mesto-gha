const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  SUCCESS_CREATED_CODE,
  ERROR_PARAMETERS_CODE,
  ERROR_DATA_CODE,
  ERROR_DATABASE_CODE,
  ERROR_SERVER_CODE,
  ERROR_PARAMETERS_MESSAGE,
  ERROR_DATA_MESSAGE,
  ERROR_DATABASE_MESSAGE,
  ERROR_SERVER_MESSAGE,
} = require('../constants/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_PARAMETERS_CODE).send({ message: ERROR_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_MESSAGE });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

module.exports.getUsersMe = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_PARAMETERS_CODE).send({ message: ERROR_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_MESSAGE });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
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
      password: passwordHash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(SUCCESS_CREATED_CODE).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'Error') {
        res.status(ERROR_PARAMETERS_CODE)
          .send({ message: ERROR_PARAMETERS_MESSAGE });
      } else if (error.name === 'MongoServerError') {
        res.status(ERROR_DATABASE_CODE)
          .send({ message: ERROR_DATABASE_MESSAGE });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

module.exports.patchUsersMe = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then(() => res.send({ name, about }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_PARAMETERS_CODE).send({ message: ERROR_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_MESSAGE });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
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
        res.status(ERROR_PARAMETERS_CODE).send({ message: ERROR_PARAMETERS_MESSAGE });
      } else if (error.name === 'DocumentNotFoundError') {
        res.status(ERROR_DATA_CODE).send({ message: ERROR_DATA_MESSAGE });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};
