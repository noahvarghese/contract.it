import { createReducer } from "../../lib/Functions";
import { InitialMapState, MapOptions } from "../../types/Map";

export const SetLocation = (
    state: MapOptions,
    location: { latitude: number; longitude: number }
): MapOptions => ({
    ...state,
    center: location,
});

export const mapReducer = createReducer(InitialMapState, {
    SET_LOCATION: SetLocation,
});
