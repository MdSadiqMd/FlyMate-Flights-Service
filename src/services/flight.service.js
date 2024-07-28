const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

const { FlightRepository } = require("../repositories");
const AppError = require("../errors/App.error");
const logger = require("../config/logger.config");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    logger.error(`Error in Creating Flight in Services: ${error}`);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  try {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    if (query.trips) {
      [departureAirportId, arrivalAirportId] = query.trips.split("-");
      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
      [minPrice, maxPrice] = query.price.split("-");
      customFilter.price = {
        [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
      };
    }
    if (query.travellers) {
      customFilter.totalSeats = {
        [Op.gte]: query.travellers,
      };
    }
    if (query.tripDate) {
      customFilter.departureTime = {
        [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
      };
    }
    if (query.sort) {
      const params = query.sort.split(",");
      const sortFilters = params.map((param) => param.split("_"));
      sortFilter = sortFilters;
    }
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    logger.error(`Error in Getting All Flights in Services: ${error}`);
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
