/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { Router, Request, Response } from "express";

const router = Router();

router.all("/", (_: Request, res: Response) => {
    res.redirect("http://localhost:" + "8080");
});

export default router;
