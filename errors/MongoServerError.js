class MongoServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MongoServerError';
    this.statusCode = 409;
  }
}

module.exports = MongoServerError;
