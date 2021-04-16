import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";

export const SetError = (_: any, action: CustomAction): string =>
    action.payload;

export const errorReducer = createReducer("", {
    SET_ERROR: SetError,
});
