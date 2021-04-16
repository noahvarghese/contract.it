import { InitialMapOptionsState, MapOptions } from "./MapOptions";
import { JobOptions, JobBuilder } from "./Jobs";
import { StatusOptions, StatusBuilder } from "./Status";

// No factories in this class as this is a singleton

export interface State {
    error: string;
    Microsoft: any;
    mapOptions: MapOptions;
    modals: string;
    current: {
        job: JobOptions;
        status: StatusOptions;
    };
    statusList: StatusOptions[];
    jobList: JobOptions[];
}

export const InitialState: State = {
    error: "",
    Microsoft: null,
    mapOptions: InitialMapOptionsState,
    modals: "DEFAULT",
    current: {
        job: JobBuilder(),
        status: StatusBuilder(),
    },
    statusList: [],
    jobList: [],
};
