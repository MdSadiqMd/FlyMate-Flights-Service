import bodyParser from "body-parser";
import express, { Express } from "express";

import serverConfig from "./config/server.config";
import logger from "./config/logger.config";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.listen(serverConfig.PORT, async () => {
    logger.info(`Server started at ${serverConfig.PORT}`);
});