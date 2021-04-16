import { createReducer } from "../../lib/Functions";
import { CustomAction } from "../../types/CustomAction";
import { InitialMap, Map } from "../../types/Map";

export const SetMicrosoft = (state: Map, action: CustomAction): Map => ({...state, Microsoft: action.payload});

export const mapReducer = createReducer(InitialMap, {
    SET_MICROSOFT: SetMicrosoft
});

