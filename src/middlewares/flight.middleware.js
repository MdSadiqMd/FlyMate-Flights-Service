const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils");
const AppError = require("../errors/App.error");

function validateFields(requiredFields, req, res, next) {
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length) {
    ErrorResponse.message = "Something went wrong while processing the request";
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

function validateCreateRequest(req, res, next) {
  const requiredFields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "arrivalTime",
    "departureTime",
    "price",
    "totalSeats",
  ];
  validateFields(requiredFields, req, res, next);
}

function validateUpdateSeatsRequest(req, res, next) {
  const requiredFields = ["seats"];
  validateFields(requiredFields, req, res, next);
}

module.exports = {
  validateCreateRequest,
  validateUpdateSeatsRequest,
};
