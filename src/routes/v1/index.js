const express = require("express");

const airplaneRoutes = require("./airplane.routes");
const cityRoutes = require("./city.routes");
const airportRoutes = require("./airport.routes");
const flightsRoutes = require("./flight.routes");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightsRoutes);

module.exports = router;
