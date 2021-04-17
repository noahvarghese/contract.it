/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { createConnection, ConnectionOptions } from "typeorm";
import Job from "../models/Job";
import Status from "../models/Status";
import Image from "../models/Image";
import * as dotenv from "dotenv";
import DBLogger from "../util/DBLogger";
dotenv.config();

const connection: ConnectionOptions = {
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    username: process.env.DB_USERNAME!,
    port: Number(process.env.DB_PORT!),
    password: process.env.DB_PASSWORD!,
    type: "postgres",
    entities: [Job, Status, Image],
    logging: true,
    logger: new DBLogger(),
    // region: process.env.RDS_REGION!,
    // secretArn: process.env.RDS_SECRET_ARN!,
    // resourceArn: process.env.RDS_RESOURCE_ARN!,
};

export default connection;
