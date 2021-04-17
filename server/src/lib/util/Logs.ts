/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
// tslint:disable: no-console
import * as dotenv from "dotenv";
dotenv.config();

export enum LogLevels {
    EVENT = 0,
    ERROR = 1,
    WARN = 2,
    DEBUG = 3,
    SQL = 4,
    LOG = 5,
}

interface LogData {
    prefix: string;
    consoleFunction: (message?: any, ...optionalParams: any[]) => void;
}

const emptyLogData = (): LogData => ({
    prefix: "",
    // tslint:disable-next-line: no-empty
    consoleFunction: (message?: any, ...optionalParams: any[]): void => {},
});

const createLogData = <T extends Partial<LogData>>(
    intialValues: T
): LogData & T => {
    return Object.assign(emptyLogData(), intialValues);
};

export default class Logs {
    static logLevel: LogLevels = Number(process.env.LOG_LEVEL!) as LogLevels;

    private static getLogData = (logLevel: LogLevels): LogData => {
        switch (logLevel) {
            case LogLevels.EVENT:
                return createLogData({
                    prefix: "[ EVENT ]: ",
                    consoleFunction: console.log,
                });
            case LogLevels.SQL:
                return createLogData({
                    prefix: "[ SQL ]: ",
                    consoleFunction: console.log,
                });
            case LogLevels.ERROR:
                return createLogData({
                    prefix: "[ ERROR ]: ",
                    consoleFunction: console.error,
                });
            case LogLevels.WARN:
                return createLogData({
                    prefix: "[ WARNING ]: ",
                    consoleFunction: console.warn,
                });
            case LogLevels.DEBUG:
                return createLogData({
                    prefix: "[ DEBUG ]: ",
                    consoleFunction: console.debug,
                });
            case LogLevels.LOG:
                return createLogData({
                    prefix: "[ LOG ]: ",
                    consoleFunction: console.log,
                });
            default:
                throw new Error(
                    "Log level passed in does match log levels set."
                );
        }
    };

    static addLog = (
        logLevel: LogLevels,
        message?: string | any,
        ...optionalParams: any[]
    ) => {
        if (logLevel <= Logs.logLevel) {
            try {
                const { prefix, consoleFunction }: LogData = Logs.getLogData(
                    logLevel
                );

                consoleFunction(prefix + message, ...optionalParams);
            } catch (e) {
                console.error(e.message);
            }
        }
    };
}
