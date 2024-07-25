import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppError from '../errors/App.error';
import { ErrorResponse } from '../utils';

function validateCreateRequest(req: Request, res: Response, next: NextFunction) {
    const { flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, totalSeats } = req.body;

    if (!flightNumber) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('flightNumber is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!airplaneId) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('airplaneId is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!departureAirportId) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('departureAirportId is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!arrivalAirportId) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('arrivalAirportId is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!arrivalTime) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('arrivalTime is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!departureTime) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('departureTime is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!price) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('price is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!totalSeats) {
        ErrorResponse.message = 'Validation failed in the create flight middleware';
        ErrorResponse.error = new AppError('totalSeats is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateUpdateSeatsRequest(req: Request, res: Response, next: NextFunction) {
    const { seats } = req.body;

    if (!seats) {
        ErrorResponse.message = 'Validation failed in the update seats middleware';
        ErrorResponse.error = new AppError('seats is missing or not in the correct format', StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

export const FlightMiddleware = {
    validateCreateRequest,
    validateUpdateSeatsRequest
};
