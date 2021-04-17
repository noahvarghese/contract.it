/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import dotenv from "dotenv";
dotenv.config();

const permalink =
    process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "contract_it.noahvarghese.me";
export default permalink;

export const statusApiLink = `${permalink}/api/statuses`;

export const jobApiLink = `${permalink}/api/jobs`;

export const statusImageLink = (image: string): string =>
    `${permalink}/assets/img/statuses/${image}`;

export const jobImageLink = (image: string): string =>
    `${permalink}/assets/img/jobs/${image}`;
