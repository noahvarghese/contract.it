/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { Action } from "redux";
export interface CustomAction extends Action {
    type: string;
    payload: any;
}
