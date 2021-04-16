import { InitialMapOptionsState, MapOptions } from "./MapOptions";
import { JobOptions, JobBuilder } from "./Jobs";
import { StatusOptions, StatusBuilder } from "./Status";
import React from "react";
import { InitialMap, Map } from "./Map";

// No factories in this class as this is a singleton

export interface State {
    MicrosoftMaps: Map;
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
    MicrosoftMaps: InitialMap,
    mapOptions: InitialMapOptionsState,
    modals: "DEFAULT",
    current: {
        job: JobBuilder(),
        status: StatusBuilder(),
    },
    statusList: [],
    jobList: [],
};
