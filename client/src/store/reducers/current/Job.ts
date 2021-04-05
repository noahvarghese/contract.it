import { createReducer } from "../../../lib/Functions";
import { JobBuilder } from "../../../types/Jobs";

export const setJob = () => {};

export const currentJobReducer = createReducer(JobBuilder(), {
    SET_CURRENT_JOB: setJob,
});
