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
