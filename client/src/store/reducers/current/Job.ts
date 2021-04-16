import { createReducer } from "../../../lib/Functions";
import { CustomAction } from "../../../types/CustomAction";
import { JobBuilder, JobOptions } from "../../../types/Jobs";

export const setJob = (_: JobOptions, action: CustomAction) => action.payload;

export const currentJobReducer = createReducer(JobBuilder(), {
    SET_CURRENT_JOB: setJob,
});
