/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    next();
};
