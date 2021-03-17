import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";
import Logs, { LogLevels } from "../util/Logs";
/* any object with "hasMany" needs to come before any that have a "hasOne"
 * relationship with that model */
import Status from "../models/Status";
import Job from "../models/Job";
import Image from "../models/Image";
dotenv.config();

const models = [path.join(__dirname, "../models")];
console.log(models);

// const sequelize = new Sequelize(connectionString);
const sequelize = new Sequelize({
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    username: process.env.DB_USERNAME!,
    port: Number(process.env.DB_PORT!),
    password: process.env.DB_PASSWORD!,
    dialect: process.env.DB_TYPE! as "mysql" | "postgres",
    logging: (message: string) => {
        if (Boolean(process.env.DEV!)) {
            Logs.addLog(message, LogLevels.SQL);
        }
    },
    models,
});

(async () => {
    [Status, Job, Image].forEach(async (model) => {
        Logs.addLog(`Syncing model: ${model.name}`, LogLevels.EVENT);
        await model.sync();
    });
})();

export default sequelize;
