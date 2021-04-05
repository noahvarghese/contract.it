import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import {
    deleteItemInArray,
    updateItemInArray,
    updateObject,
} from "../../lib/Functions";
import { JobOptions } from "../../types/Jobs";

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
    ADD_JOB: addJob,
    DELETE_JOB: deleteJob,
    EDIT_JOB: editJob,
});
