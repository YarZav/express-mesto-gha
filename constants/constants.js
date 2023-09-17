const secret = 'some-secret-key';

const urlRegExp = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const SUCCESS_FETCH_CODE = 200;
const SUCCESS_CREATED_CODE = 201;
const ERROR_PARAMETERS_CODE = 400;
const ERROR_AUTH_CODE = 401;
const ERROR_USER_CODE = 403;
const ERROR_DATA_CODE = 404;
const ERROR_DATABASE_CODE = 409;
const ERROR_SERVER_CODE = 500;

const ERROR_PARAMETERS_MESSAGE = 'Переданы некорректные данные.';
const ERROR_AUTH_MESSAGE = 'Пользователь неавторизован';
const ERROR_USER_MESSAGE = 'Данные чужого пользователя';
const ERROR_DATABASE_MESSAGE = 'Ошибка базы данных';
const ERROR_DATA_MESSAGE = 'Данные не найдены.';
const ERROR_SERVER_MESSAGE = 'Ошибка сервера.';

module.exports = {
  secret,
  urlRegExp,
  SUCCESS_FETCH_CODE,
  SUCCESS_CREATED_CODE,
  ERROR_PARAMETERS_CODE,
  ERROR_AUTH_CODE,
  ERROR_USER_CODE,
  ERROR_DATA_CODE,
  ERROR_DATABASE_CODE,
  ERROR_SERVER_CODE,
  ERROR_PARAMETERS_MESSAGE,
  ERROR_AUTH_MESSAGE,
  ERROR_USER_MESSAGE,
  ERROR_DATABASE_MESSAGE,
  ERROR_DATA_MESSAGE,
  ERROR_SERVER_MESSAGE,
};
