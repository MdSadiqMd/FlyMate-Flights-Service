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
        explanation.push("An unknown validation error occurred");
      }
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
};
