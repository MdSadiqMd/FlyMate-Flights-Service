import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

import AppError from "../errors/App.error";
import { FlightAttributes, FlightQueryParams } from "../types";
import logger from "../config/logger.config";

const flightRepository = new FlightRepository();

async function createFlight(data: FlightAttributes) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
            let explanation: string[] = [];
            error.errors.forEach((err: { message: string; }) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation.join(`\n`), StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object in Services', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query: FlightQueryParams) {
    let customFilter: { [key: string]: any; } = {};
    let sortFilter: string[][] = [];
    const endingTripTime = " 23:59:00";

    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-").map(Number);
        customFilter.price = {
            [Op.between]: [minPrice, maxPrice === undefined ? 20000 : maxPrice]
        };
    }
    if (query.travellers !== undefined) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        };
    }
    if (query.sort) {
        const params = query.sort.split(',');
        sortFilter = params.map((param) => param.split('_'));
    }
    logger.info(`The Received Filter are ${customFilter} with sort Filter ${sortFilter}`);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error: any) {
        logger.error(`Error in get All flights Service ${error}`);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id: string) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error: any) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data: { flightId: string; seats: string; dec?: boolean; }) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        logger.error(`Error in updating seats in flight Service: ${error}`);
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export const FlightService = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
