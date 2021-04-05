import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import {
    deleteItemInArray,
    updateItemInArray,
    updateObject,
} from "../../lib/Functions";
import { StatusOptions } from "../../types/Status";

export const replaceStatusList = (_: StatusOptions[], action: CustomAction) => action.payload;

export const addStatus = (
    state: StatusOptions[],
    action: CustomAction
): StatusOptions[] => {
    let returnState: StatusOptions[] = state;

    if (Array.isArray(action.payload)) {
        returnState = state.concat(action.payload);
    } else {
        returnState = [...state, action.payload];
    }

    return returnState;
};

export const deleteStatus = (state: StatusOptions[], action: CustomAction) =>
    deleteItemInArray(state, action.payload.id);

export const editStatus = (state: StatusOptions[], action: CustomAction) =>
    updateItemInArray(state, action.payload.id, (status) =>
        updateObject(status, action.payload)
    );

export const toggleStatus = (
    state: StatusOptions[],
    action: CustomAction
): StatusOptions[] =>
    updateItemInArray(state, action.payload.id, (status) =>
        updateObject(status, { checked: !status.checked })
    );

export const statusReducer = createReducer([], {
    REPLACE_STATUS_LIST: replaceStatusList,
    ADD_STATUS: addStatus,
    DELETE_STATUS: deleteStatus,
    EDIT_STATUS: editStatus,
    TOGGLE_STATUS: toggleStatus,
});
