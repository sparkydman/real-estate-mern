class ErrorRes extends Error {
  constructor(message, path, status) {
    super();
    this.message = message;
    this.statusCode = status;
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorRes;
