const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);
  const error = { ...err };

  if (err.name === "CastError") {
    error.message = "Your ID structure incorrect.";
    error.statusCode = 400;
  }
  if (err.name === "JsonWebTokenError" && err.message === "invalid token") {
    error.message = "Token structure is an incorrect";
    error.statusCode = 400;
  }
  if (err.name === " JsonWebTokenError" && err.message === "jwt malformed") {
    error.message = "You need to logged in!!!.";
    error.statusCode = 401;
  }
  if (error.code === 11000) {
    error.message = "Data duclicated";
    error.statusCode = 400;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    local_error: error,
    component_error: err.message,
  });
};
module.exports = errorHandler;
