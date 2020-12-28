import ErrorRes from '../utils/ErrorRes';

const errorHandler = (err, req, res, next) => {
  console.log(err);
  try {
    if (err.name === 'ValidationError') {
      return (err = handleValidationErr(err, res));
    }
    if (err.code && err.code === 11000) {
      return (err = handleDuplicateError(err, res));
    }
    if (err.name === 'CastError') {
      return (err = handleBadObjectId(err, res));
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

const handleValidationErr = (err, res) => {
  const errors = Object.values(err.errors).map((err) => err.message);
  const paths = Object.values(err.errors).map((err) => err.path);

  const error = new ErrorRes(errors, paths, 400);
  res.status(400).json({
    success: false,
    error,
  });
};
const handleBadObjectId = (err, res) => {
  const error = new ErrorRes('Invalid ID', null, 400);
  res.status(400).json({
    success: false,
    error,
  });
};

const handleDuplicateError = (err, res) => {
  const path = Object.keys(err.keyValue);
  const error = new ErrorRes(`${path} already exist`, path, 409);
  res.status(409).json({
    success: false,
    error,
  });
};

export default errorHandler;
