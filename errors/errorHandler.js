const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 404;
  const { message } = err;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
