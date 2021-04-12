import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import { InitialMapState, MapOptions } from "../../types/Map";

export const SetLocation = (
    state: MapOptions,
    action: CustomAction
): MapOptions => ({
    ...state,
    center: action.payload,
});

export const mapReducer = createReducer(InitialMapState, {
    SET_LOCATION: SetLocation,
});
