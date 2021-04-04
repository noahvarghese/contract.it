import { State, InitialState } from "../../types/State";
import { SET_LOCATION, SET_MODAL_FILTER } from "../constants";
import { SetLocation } from "./map";
import { SetFilters } from "./filters";
import { SetStatuses, SetDeleteStatus, SetUpdateStatus } from "./statuses";
import { CustomAction } from "../../types/CustomAction";

export const reducer = (
    state: State = InitialState,
    { type, payload }: CustomAction
) => {
    switch (type) {
        case SET_LOCATION:
            return SetLocation(state, payload);
        default:
            return state;
    }
};

export const createReducer = (initialState: any, handlers: object) => {
    return (state: any = initialState, action: CustomAction) => {
        if (handlers.hasOwnProperty(action.type)) {
            return (handlers[action.type as keyof object] as any)(
                state,
                action
            );
        } else {
            return state;
        }
    };
};
