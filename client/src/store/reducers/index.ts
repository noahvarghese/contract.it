import { Action } from "redux";
import { State, InitialState } from "../types/state";
import { SET_FILTERS, SET_LOCATION } from "../types/actions";
import { SetLocation } from "./map";
import { SetFilters } from "./filters";

export interface CustomAction extends Action {
    type: string;
    payload: any;
}

export const reducer = (
    state: State = InitialState,
    { type, payload }: CustomAction
) => {
    switch (type) {
        case SET_LOCATION:
            return SetLocation(state, payload);
        case SET_FILTERS:
            return SetFilters(state, payload);
        default:
            return state;
    }
};
