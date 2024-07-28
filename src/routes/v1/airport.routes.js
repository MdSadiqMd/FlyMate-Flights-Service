const express = require("express");

const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);
router.get("/", AirportController.getAirports);
router.get("/:id", AirportController.getAirport);
router.patch("/:id", AirportController.updateAirport);
router.delete("/:id", AirportController.destroyAirport);

module.exports = router;
