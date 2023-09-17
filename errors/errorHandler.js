const errorHandler = (err, req, res, next) => {
  let statusCode;
  if (err.name === 'MongoServerError') {
    statusCode = 409;
  } else if (err.name === 'Error') {
    statusCode = 401;
  } else {
    statusCode = err.statusCode || 404;
  }

  const { message } = err;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
