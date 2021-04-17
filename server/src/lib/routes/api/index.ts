/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { Router } from "express";
import StatusesRouter from "./statuses";
import JobsRouter from "./jobs";
import ImagesRouter from "./images";

const router = Router();

router.use("/images", ImagesRouter);
router.use("/jobs", JobsRouter);
router.use("/statuses", StatusesRouter);

export default router;
