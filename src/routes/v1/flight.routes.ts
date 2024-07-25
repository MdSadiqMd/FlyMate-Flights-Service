import express from 'express';

import { FlightController } from '../../controllers';
import { FlightMiddleware } from '../../middlewares';

const flightRouter = express.Router();

flightRouter.post(
    '/',
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight
);

flightRouter.get(
    '/',
    FlightController.getAllFlights
);

flightRouter.get(
    '/:id',
    FlightController.getFlight
);

flightRouter.patch(
    '/:id/seats',
    FlightMiddleware.validateUpdateSeatsRequest,
    FlightController.updateSeats
);

export default flightRouter;