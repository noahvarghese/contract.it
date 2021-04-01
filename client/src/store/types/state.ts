import { InitialMapState, MapOptions } from "./map";
import { InitialFilters, FilterOptions } from "./filters";

export interface State {
    mapOptions: MapOptions;
    filters: FilterOptions[];
}

export const InitialState: State = {
    mapOptions: InitialMapState,
    filters: InitialFilters,
};
