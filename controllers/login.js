const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ERROR_WRONG_USER_CODE = 401;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      res
        .status(ERROR_WRONG_USER_CODE)
        .send({ message: error.message });
    });
};
