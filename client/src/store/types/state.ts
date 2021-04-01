import { InitialMapState, MapOptions } from "./map";
import { InitialFilters, FilterOptions } from "./filters";
import { InitialModalOptions, ModalOptions } from "./modals";

export interface State {
    mapOptions: MapOptions;
    filters: FilterOptions[];
    modals: ModalOptions
}

export const InitialState: State = {
    mapOptions: InitialMapState,
    filters: InitialFilters,
    modals: InitialModalOptions
};
