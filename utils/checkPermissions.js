const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  if (
    requestUser.role === "admin" ||
    requestUser.userId === resourceUserId.toString()
  ) {
    return;
  }
  throw new CustomError.UnauthorizedError(
    "not authorized to access this route"
  );
};

module.exports = checkPermissions;
