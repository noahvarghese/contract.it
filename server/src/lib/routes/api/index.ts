import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
    res.send("HIII");
});

router.post("/signUp", (req, res) => {});
export default router;
