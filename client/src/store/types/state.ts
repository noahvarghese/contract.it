import { InitialMapState, MapOptions } from "./map";
import { FilterOptions } from "./filters";
import { InitialModalOptions, ModalOptions } from "./modals";
import { JobOptions, JobBuilder } from "./jobs";
import { StatusOptions, StatusBuilder } from "./statuses";

// No factories in this class as this is a singleton

export interface State {
    mapOptions: MapOptions;
    filters: FilterOptions[];
    modals: ModalOptions;
    current: {
        job: JobOptions;
        status: StatusOptions;
    },
    statuses: StatusOptions[];
    jobs: JobOptions[];
}

export const InitialState: State = {
    mapOptions: InitialMapState,
    filters: [],
    modals: InitialModalOptions,
    current: {
        job: JobBuilder(),
        status: StatusBuilder()
    },
    statuses: [],
    jobs: []
};
