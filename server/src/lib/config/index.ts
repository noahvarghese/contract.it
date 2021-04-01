import * as dotenv from "dotenv";
dotenv.config();

export const dev: boolean = JSON.parse(process.env.DEV!);
export const test: boolean = JSON.parse(process.env.TEST!);
export const devPermalink: string = "http://localhost:3000";

let permalink: string;
let port: number = 4000;

if (dev) {
    permalink = "http://localhost:4000";
} else if (test) {
    permalink = process.env.TEST_ENV!;
    port = 4001;

    if (!permalink) {
        throw new Error("Test environment not defined yet.");
    }
} else {
    permalink = process.env.PROD_ENV!;

    if (!permalink) {
        throw new Error("Production environment not defined yet.");
    }
}

export default {
    permalink,
    port,
};
