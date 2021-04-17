/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { createReducer } from "../../../lib/Functions";
import { CustomAction } from "../../../types/CustomAction";
import { JobBuilder, JobOptions } from "../../../types/Jobs";

export const setJob = (_: JobOptions, action: CustomAction) => action.payload;

export const currentJobReducer = createReducer(JobBuilder(), {
    SET_CURRENT_JOB: setJob,
});
