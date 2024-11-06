// handleValidationError.js - For throwing validation errors with a message and status code
export const handleValidationError = (message, statusCode) => {
  const error = new Error(message);  // Create a new Error object
  error.statusCode = statusCode;  // Attach the statusCode to the error
  throw error;  // Throw the error to be caught by the errorHandler middleware
};

// errorHandler.js - Middleware for handling errors
export const errorHandler = (err, req, res, next) => {
  // Default status code is 500 for server errors, can be overridden by custom error codes
  const statusCode = err.statusCode || 500;  

  // Use error.message if available, otherwise default to 'Internal Server Error'
  const message = err.message || 'Internal Server Error';

  // Optional: Log the error stack trace in the development environment (useful for debugging)
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);  // Log the full error stack for debugging
  }

  // Respond with the error status and message
  res.status(statusCode).json({
    success: false,  // Indicate failure in the response
    message,         // Include the error message
    stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Include stack trace in dev mode
  });
};
