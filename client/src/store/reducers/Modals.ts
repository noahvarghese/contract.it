import React from "react";
import { createReducer } from ".";
import { CustomAction } from "../../types/CustomAction";
import { State } from "../../types/State";
import { SET_MODAL_FILTER } from "../constants";
import Blocker from "../../components/Overlay/Blocker";
import JobForm from "../../components/Job/Form/Form";
import StatusForm from "../../components/Status/Form/Form";
import StatusList from "../../components/Status/List/List";
import DeleteStatus from "../../components/Status/Delete/Delete";

export const setModalFilters = (
    component?: React.FC | undefined
): CustomAction => {
    return {
        type: SET_MODAL_FILTER,
        payload: component,
    };
};

export const showJobForm = (_: State, __: CustomAction) => [Blocker, JobForm];
export const showStatusForm = (_: State, __: CustomAction) => [
    Blocker,
    StatusForm,
];
export const showDeleteStatus = (_: State, __: CustomAction) => [
    Blocker,
    DeleteStatus,
];
export const showStatusList = (_: State, __: CustomAction) => [
    Blocker,
    StatusList,
];

export const modalReducer = createReducer(undefined, {
    SHOW_JOB_FORM: showJobForm,
    SHOW_STATUS_FORM: showStatusForm,
    SHOW_DELETE_STATUS: showDeleteStatus,
    SHOW_STATUS_LIST: showStatusList,
});
