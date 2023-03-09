const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const LocalError = require("../utils/locaError");
const User = require("../models/user");

exports.protection = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new LocalError("Please logged in.", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new LocalError("No token.", 400);
  }
  const tokenned = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = tokenned.id;
  req.userRole = tokenned.role;
  next();
});
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      throw new LocalError(
        "your [" + req.userRole + "] permission cannot allowed!",
        403
      );
    }
    next();
  };
};
