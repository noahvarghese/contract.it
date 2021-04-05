import { InitialMapState, MapOptions } from "./Map";
import { JobOptions, JobBuilder } from "./Jobs";
import { StatusOptions, StatusBuilder } from "./Status";
import React from "react";

// No factories in this class as this is a singleton

export interface State {
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
    mapOptions: InitialMapState,
    modals: "DEFAULT",
    current: {
        job: JobBuilder(),
        status: StatusBuilder(),
    },
    statusList: [],
    jobList: [],
};
