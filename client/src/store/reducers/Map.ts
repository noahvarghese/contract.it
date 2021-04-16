import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";

export const SetMicrosoft = (_: any, action: CustomAction): any =>
    action.payload;

export const mapReducer = createReducer(null, {
    SET_MICROSOFT: SetMicrosoft,
});
