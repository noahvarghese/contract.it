/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";

export const SetError = (_: any, action: CustomAction): string =>
    action.payload;

export const errorReducer = createReducer("", {
    SET_ERROR: SetError,
});
