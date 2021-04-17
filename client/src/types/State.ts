/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
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
