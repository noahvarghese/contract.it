import { createReducer } from "../../../lib/Functions";
import { CustomAction } from "../../../types/CustomAction";
import { StatusBuilder, StatusOptions } from "../../../types/Status";

export const setStatus = (_: StatusOptions, action: CustomAction) =>
    action.payload;

export const currentStatusReducer = createReducer(StatusBuilder(), {
    SET_CURRENT_STATUS: setStatus,
});
