import { Router } from "express";
import StatusesRouter from "./statuses";
import JobsRouter from "./jobs";
import ImagesRouter from "./images";

const router = Router();

router.use("/images", ImagesRouter);
router.use("/jobs", JobsRouter);
router.use("/statuses", StatusesRouter);

export default router;
