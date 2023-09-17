const jwt = require('jsonwebtoken');
const { ERROR_AUTH_CODE, ERROR_AUTH_MESSAGE } = require('../constants/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(ERROR_AUTH_CODE).send({ message: ERROR_AUTH_MESSAGE });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(ERROR_AUTH_CODE).send({ message: ERROR_AUTH_MESSAGE });
  }

  req.user = payload;

  next();
};
