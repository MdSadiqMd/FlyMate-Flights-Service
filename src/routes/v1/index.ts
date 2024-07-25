import express from 'express';

import flightRouter from './flight.routes';

const v1Routes = express.Router();

v1Routes.use('/flights', flightRouter);

export default v1Routes;