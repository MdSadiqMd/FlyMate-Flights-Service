const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../errors/App.error");
const logger = require("../config/logger.config");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    logger.error(`Error in creating city in City Service: ${error}`);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
      } else {
        explanation.push(
          "An unknown validation error occurred in city service"
        );
      }
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    logger.error(`Error in Updating City in Services: ${error}`);
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The City you requested to update is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot update the requested airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    logger.error(`Error in Deleting City in Services: ${error}`);
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot deleting airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  updateCity,
  destroyCity,
};
