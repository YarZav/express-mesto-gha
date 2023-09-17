const errorHandler = (err, req, res, next) => {
  let statusCode;
  if (err.name === 'MongoServerError') {
    statusCode = 409;
  } else {
    statusCode = err.statusCode || 404;
  }

  console.log(err.name);
  console.log(err.message);
  console.log(err.statusCode);
  const { message } = err;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
