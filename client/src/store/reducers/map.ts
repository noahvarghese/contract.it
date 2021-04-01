import { State } from "../types/state";

export const SetLocation = (
    state: State,
    location: { latitude: number; longitude: number }
): State => ({
    ...state,
    mapOptions: {
        ...state.mapOptions,
        center: location,
    },
});
