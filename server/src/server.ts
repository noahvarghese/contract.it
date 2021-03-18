import * as express from "express";
import { createConnection } from "typeorm";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import config from "./lib/config";
import router from "./lib/routes";
// import authMiddleware from "./lib/middleware";
import Logs, { LogLevels } from "./lib/util/Logs";
import postgresConnectionOptions from "./lib/config/database";

const app = express();

(async () => {
    /* Database */
    try {
        await createConnection(postgresConnectionOptions);
        Logs.addLog("Database connected.", LogLevels.EVENT);
    } catch (_) {
        Logs.addLog("Error connecting to database.", LogLevels.ERROR);
        return;
    }

    /* Hide powered by express header */
    app.disable("x-powered-by");

    /* only allow access from current url */
    app.use(cors({ origin: config.permalink }));

    /* Allow file upload */
    app.use(fileUpload({ createParentPath: true }));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    // app.use(authMiddleware);

    /* All routes stem from here */
    app.use("/", router);

    app.listen(config.port, () => {
        Logs.addLog(`Server started on port: ${config.port}`, LogLevels.EVENT);
    });
})();
