/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import * as express from "express";
import { createConnection } from "typeorm";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import config, { dev, devPermalink } from "./lib/config";
import router from "./lib/routes";
// import authMiddleware from "./lib/middleware";
import Logs, { LogLevels } from "./lib/util/Logs";
import postgresConnectionOptions from "./lib/config/database";

const app = express();

(async () => {
    /* Database */
    try {
        await createConnection(postgresConnectionOptions);
        Logs.addLog(LogLevels.EVENT, "Database connected.");
    } catch (_) {
        Logs.addLog(LogLevels.ERROR, "Error connecting to database.");
        return;
    }

    /* Hide powered by express header */
    app.disable("x-powered-by");

    /* only allow access from current url */
    app.use(cors({ origin: dev ? devPermalink : config.permalink }));

    /* Allow file upload */
    app.use(fileUpload({ createParentPath: true }));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    // app.use(authMiddleware);

    /* All routes stem from here */
    app.use("/", router);

    app.listen(config.port, () => {
        Logs.addLog(LogLevels.EVENT, `Server started on port: ${config.port}`);
    });
})();
