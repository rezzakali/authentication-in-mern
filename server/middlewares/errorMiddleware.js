// external imports

// internal imports
import ErrorResponse from '../utilities/error.js';

function errorMiddleware(err, req, res, next) {
  const error = { ...err };
  error.message = err.message;

  // mongoDB duplicate value error

  if (err.code === 11000) {
    const message = `Duplicate value don't allow`;
    error = new ErrorResponse(400, message);
  }

  // mongoDB validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }
  // default error
  console.log(error);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'There was a server side error!',
  });
  next();
}

export default errorMiddleware;
