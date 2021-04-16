import { Logger, QueryRunner } from "typeorm";
import Logs, { LogLevels } from "./Logs";

export default class DBLogger implements Logger {
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const message = `Query executing: ${query}\nParams: ${parameters}`;
        Logs.addLog(LogLevels.SQL, message);
    }
    logQueryError(
        error: string | Error,
        query: string,
        parameters?: any[],
        queryRunner?: QueryRunner
    ) {
        const message = `Query: ${query}\nFailed with error: ${error}\nParams: ${parameters}\nQuery Runner: ${queryRunner}`;
        Logs.addLog(LogLevels.ERROR, message);
    }
    logQuerySlow(
        time: number,
        query: string,
        parameters?: any[],
        queryRunner?: QueryRunner
    ) {
        const message = `Query: ${query}\nRunning too slow at ${time}ms\nParams: ${parameters}\nQuery Runner: ${queryRunner}`;
        Logs.addLog(LogLevels.WARN, message);
    }
    logSchemaBuild(contents: string, queryRunner?: QueryRunner) {
        const message = `Schema being built: ${contents}\nQuery Runner: ${queryRunner}`;
        Logs.addLog(LogLevels.SQL, message);
    }
    logMigration(contents: string, queryRunner?: QueryRunner) {
        const message = `Migration being ran: ${contents}\nQuery Runner: ${queryRunner}`;
        Logs.addLog(LogLevels.SQL, message);
    }
    log(
        level: "log" | "info" | "warn",
        message: any,
        queryRunner?: QueryRunner
    ) {
        Logs.addLog(LogLevels.SQL, message);
    }
}
