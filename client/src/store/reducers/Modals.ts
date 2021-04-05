import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import { State } from "../../types/State";

export const showDefault = () => "DEFAULT";
export const showJobForm = (_: State, __: CustomAction) => "SHOW_JOB_FORM";
export const showStatusForm = (_: State, __: CustomAction) =>
    "SHOW_STATUS_FORM";
export const showDeleteStatus = (_: State, __: CustomAction) =>
    "SHOW_DELETE_STATUS";
export const showStatusList = (_: State, __: CustomAction) =>
    "SHOW_STATUS_LIST";

export const modalReducer = createReducer(showDefault(), {
    SHOW_DEFAULT: showDefault,
    SHOW_JOB_FORM: showJobForm,
    SHOW_STATUS_FORM: showStatusForm,
    SHOW_DELETE_STATUS: showDeleteStatus,
    SHOW_STATUS_LIST: showStatusList,
});