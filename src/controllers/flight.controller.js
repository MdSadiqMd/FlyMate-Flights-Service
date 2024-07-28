const { StatusCodes } = require("http-status-codes");

const { SuccessResponse, ErrorResponse, compareDateTime } = require("../utils");
const AppError = require("../errors/App.error");
const { FlightService } = require("../services");

async function createFlight(req, res) {
  try {
    if (
      !compareDateTime.compareDateTime(
        req.body.arrivalTime,
        req.body.departureTime
      )
    ) {
      throw new AppError(
        "Arrival time must be greater than departure time",
        StatusCodes.BAD_REQUEST
      );
    } else if (req.body.departureAirportId == req.body.arrivalAirportId) {
      throw new AppError(
        "Departure and arrival airport reference cannot be same",
        StatusCodes.BAD_REQUEST
      );
    } else {
      const flight = await FlightService.createFlight({
        flightNumber: req.body.flightNumber,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
        totalSeats: req.body.totalSeats,
      });
      SuccessResponse.data = flight;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
