const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils");
const AppError = require("../errors/App.error");

function validateCreateRequest(req, res, next) {
  const requiredFields = ["name", "code", "cityId"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      missingFields.map(
        (field) =>
          `${field} not found in the incoming request in the correct form`
      ),
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
