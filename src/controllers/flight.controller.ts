import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { FlightService } from "../services/flight.service";
import { FlightAttributes } from "../types";
import { SuccessResponse, ErrorResponse } from "../utils";
import logger from "../config/logger.config";

async function createFlight(req: Request, res: Response) {
    try {
        const flight: FlightAttributes = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error: any) {
        logger.error(`Error in creating flight in flight controller: ${error}`);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getAllFlights(req: Request, res: Response) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error: any) {
        logger.error(`Error in fetching flights in flight controller: ${error}`);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getFlight(req: Request, res: Response) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        logger.error(`Error in getting flight in flight controller: ${error}`);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function updateSeats(req: Request, res: Response) {
    try {
        logger.info(`Body received for updating: ${req.body}`);
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error: any) {
        logger.error(`Error in updating seats in flight controller: ${error}`);
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

export const FlightController = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};