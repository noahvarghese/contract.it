import { Request, Response, Router } from "express";
import * as path from "path";
import config from "../../config";
import Logs, { LogLevels } from "../../util/Logs";

const router = Router();

router.get("/img/statuses/*", (req: Request, res: Response) => {
    const parentPath = path.join(__dirname, "/../../../..");
    const statusesAssetsPath = `${parentPath}${req.originalUrl}`;
    res.sendFile(statusesAssetsPath);
});
router.get("/img/jobs/*", (req: Request, res: Response) => {
    const parentPath = path.join(__dirname, "/../../../..");
    const jobsAssetsPath = `${parentPath}${req.originalUrl}`;
    res.sendFile(jobsAssetsPath);
});

export default router;