/*
“StAuth10065: I Noah Varghese, 000753196 certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else.”
*/
import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import {
    deleteItemInArray,
    updateItemInArray,
    updateObject,
} from "../../lib/Functions";
import { JobOptions } from "../../types/Jobs";

const replaceJobs = (_: JobOptions, action: CustomAction): JobOptions[] =>
    action.payload;

const addJob = () => (
    state: JobOptions[],
    action: CustomAction
): JobOptions[] => {
    let returnState: JobOptions[] = state;

    if (Array.isArray(action.payload)) {
        returnState = state.concat(action.payload);
    } else {
        returnState = [...state, action.payload];
    }

    return returnState;
};

const deleteJob = (state: JobOptions[], action: CustomAction) =>
    deleteItemInArray(state, action.payload.id);

const editJob = (state: JobOptions[], action: CustomAction) =>
    updateItemInArray(state, action.payload.id, (status) =>
        updateObject(status, action.payload)
    );

export const jobReducer = createReducer([], {
    REPLACE_JOBS: replaceJobs,
    ADD_JOB: addJob,
    DELETE_JOB: deleteJob,
    EDIT_JOB: editJob,
});
