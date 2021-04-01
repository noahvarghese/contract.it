import { InitialMapState, MapOptions } from "./map";

export interface State {
    mapOptions: MapOptions;
}

export const InitialState: State = {
    mapOptions: InitialMapState,
};
