import { InitialMapState, MapOptions } from "./Map";
import { JobOptions, JobBuilder } from "./Jobs";
import { StatusOptions, StatusBuilder } from "./Status";
import React from "react";

// No factories in this class as this is a singleton

export interface State {
    mapOptions: MapOptions;
    modals: React.FC | undefined;
    current: {
        job: JobOptions;
        status: StatusOptions;
    };
    statuses: StatusOptions[];
    jobs: JobOptions[];
}

export const InitialState: State = {
    mapOptions: InitialMapState,
    modals: undefined,
    current: {
        job: JobBuilder(),
        status: StatusBuilder(),
    },
    statuses: [],
    jobs: [],
};
