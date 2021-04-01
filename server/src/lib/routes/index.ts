import { Router, Request, Response, static as expressStatic } from "express";
import path from "path";
import * as dotenv from "dotenv";
import devRouter from "./dev";
import apiRouter from "./api";
import assetsRouter from "./assets";

dotenv.config();
const dev: boolean = JSON.parse(process.env.DEV!);

const router = Router();

if (dev) {
    // redirect root requests to vue
    router.use("/", devRouter);
} else {
    const viewsPath = path.join(__dirname, "../../..", "views");
    router.use(expressStatic(viewsPath));

    router.all("/", (_: Request, res: Response) => {
        res.sendFile(path.join(viewsPath, "index.html"));
    });
}

router.use("/api", apiRouter);
router.use("/assets", assetsRouter);

export default router;
