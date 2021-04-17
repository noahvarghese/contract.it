/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import { InitialMapOptionsState, MapOptions } from "../../types/MapOptions";

export const SetLocation = (
    state: MapOptions,
    action: CustomAction
): MapOptions => ({
    ...state,
    center: action.payload,
});

export const mapOptionsReducer = createReducer(InitialMapOptionsState, {
    SET_LOCATION: SetLocation,
});
