import express from "express";

import config from "./config/server.config.js";
import logger from "./config/logger.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.PORT, () => {
  logger.info(`Successfully started the server on PORT : ${config.PORT}`);
});
